export interface Mountpoint {
  path: string
  label: string | null
}

export interface Drive {
  blockSize: number
  busType: string
  busVersion: null
  description: string
  device: string
  devicePath: string | null
  enumerator: string
  error: null
  isCard: null
  isReadOnly: boolean
  isRemovable: boolean
  isSCSI: boolean | null
  isSystem: boolean
  isUAS: null
  isUSB: boolean | null
  isVirtual: boolean | null
  logicalBlockSize: number
  mountpoints: Mountpoint[]
  raw: string
  size: number | null
  partitionTableType: 'mbr' | 'gpt' | null
}

export interface LsblkJsonOutput {
  blockdevices: LsblkJsonOutputDevice[]
}

export interface LsblkJsonOutputDevice {
  children: LsblkJsonOutputDeviceChild[]
  hotplug?: string
  kname?: string
  label: string | null
  'log-sec'?: string
  model: string | null
  mountpoint: string | null
  name: string
  partlabel: string | null
  'phy-sec'?: string
  rm?: string
  ro?: string
  size?: string
  subsystems?: string
  tran?: string
  vendor: string | null
  pttype?: 'gpt' | 'dos'
}

export interface LsblkJsonOutputDeviceChild {
  label: string | null
  mountpoint?: string
  partlabel: string | null
}
