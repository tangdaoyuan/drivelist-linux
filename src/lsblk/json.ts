import { posix } from 'path'

import type { Drive, LsblkJsonOutput, LsblkJsonOutputDevice, LsblkJsonOutputDeviceChild, Mountpoint } from '../types'
import { getPartitionTableType } from '.'

function getMountpoints(
  children: Array<LsblkJsonOutputDeviceChild | LsblkJsonOutputDevice>,
): Mountpoint[] {
  return children
    .filter((child) => {
      return child.mountpoint
    })
    .map((child) => {
      return {
        path: child.mountpoint!,
        label: child.label || child.partlabel,
      }
    })
}

function getDescription(device: LsblkJsonOutputDevice): string {
  const description = [
    device.label || '',
    device.vendor || '',
    device.model || '',
  ]
  if (device.children) {
    let subLabels = device.children
      .filter(c => (c.label && c.label !== device.label) || c.mountpoint)
      .map(c => c.label || c.mountpoint)
    subLabels = Array.from(new Set(subLabels))
    if (subLabels.length)
      description.push(`(${subLabels.join(', ')})`)
  }
  return description.join(' ').replace(/\s+/g, ' ').trim()
}

function resolveDeviceName(name?: string): string | null {
  if (!name)
    return null

  if (!posix.isAbsolute(name))
    return posix.resolve('/dev', name)

  return name
}

export function transform(data: LsblkJsonOutput): Drive[] {
  return data.blockdevices
    .map(device =>
      Object.assign({}, device, {
        name: resolveDeviceName(device.name),
        kname: resolveDeviceName(device.kname),
      }),
    )
    .filter(
      device =>
      // Omit loop devices, CD/DVD drives, and RAM
        !device.name.startsWith('/dev/loop')
        && !device.name.startsWith('/dev/sr')
        && !device.name.startsWith('/dev/ram'),
    )
    .map(
      (device: LsblkJsonOutputDevice): Drive => {
        const isVirtual = device.subsystems
          ? /^(block)$/i.test(device.subsystems)
          : null
        const isSCSI = device.tran
          ? /^(sata|scsi|ata|ide|pci)$/i.test(device.tran)
          : null
        const isUSB = device.tran ? /^(usb)$/i.test(device.tran) : null
        const isReadOnly = Number(device.ro) === 1
        const isRemovable
          = Number(device.rm) === 1
          || Number(device.hotplug) === 1
          || Boolean(isVirtual)
        return {
          enumerator: 'lsblk:json',
          busType: (device.tran || 'UNKNOWN').toUpperCase(),
          busVersion: null,
          device: device.name,
          devicePath: null,
          raw: device.kname || device.name,
          description: getDescription(device),
          error: null,
          size: Number(device.size) || null,
          blockSize: Number(device['phy-sec']) || 512,
          logicalBlockSize: Number(device['log-sec']) || 512,
          mountpoints: device.children
            ? getMountpoints(device.children)
            : getMountpoints([device]),
          isReadOnly,
          isSystem: !isRemovable && !isVirtual,
          isVirtual,
          isRemovable,
          isCard: null,
          isSCSI,
          isUSB,
          isUAS: null,
          partitionTableType: getPartitionTableType(device.pttype),
        }
      },
    )
}

export function parse(stdout: string): Drive[] {
  return transform(JSON.parse(stdout))
}
