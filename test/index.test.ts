import { describe, expect, it, vi } from 'vitest'
import { SUPPORTS_JSON } from './json'
import { list } from '@'

function createPromisify() {
  vi.mock('util', () => {
    return {
      promisify: () => () => ({ stdout: SUPPORTS_JSON }),
    }
  })
  return () => {
    vi.unmock('util')
  }
}

describe('fetch driver list', () => {
  it('supports json', async() => {
    const dispose = createPromisify()
    const drives = await list(true)
    expect(drives).toBeDefined()
    expect(drives.length).toBeGreaterThan(0)
    expect(drives).toMatchInlineSnapshot(`
      [
        {
          "blockSize": 4096,
          "busType": "SATA",
          "busVersion": null,
          "description": "ATA ST1000DM010-2EP1 (/, [SWAP], /boot/efi)",
          "device": "/dev/sda",
          "devicePath": null,
          "enumerator": "lsblk:json",
          "error": null,
          "isCard": null,
          "isReadOnly": false,
          "isRemovable": false,
          "isSCSI": true,
          "isSystem": true,
          "isUAS": null,
          "isUSB": false,
          "isVirtual": false,
          "logicalBlockSize": 512,
          "mountpoints": [
            {
              "label": null,
              "path": "/",
            },
            {
              "label": null,
              "path": "[SWAP]",
            },
            {
              "label": "EFI System Partition",
              "path": "/boot/efi",
            },
          ],
          "partitionTableType": null,
          "raw": "/dev/sda",
          "size": 1000204886016,
        },
      ]
    `)
    dispose()
  })
})
