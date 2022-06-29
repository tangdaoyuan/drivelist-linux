# drivelist-linux

> Get driver list in linux


## Install

```bash
npm install drivelist-linux -g
```

## Usage

```bash
drivelist-linux
```

## Programmatic API

```ts
import { list } from '@suger-tdy/drivelist-linux'

const drivers = await list()

console.log(drivers)

// output:
// [
//   {
//     "blockSize": 4096,
//     "busType": "SATA",
//     "busVersion": null,
//     "description": "ATA ST1000DM010-2EP1 (/, [SWAP], /boot/efi)",
//     "device": "/dev/sda",
//     "devicePath": null,
//     "enumerator": "lsblk:json",
//     "error": null,
//     "isCard": null,
//     "isReadOnly": false,
//     "isRemovable": false,
//     "isSCSI": true,
//     "isSystem": true,
//     "isUAS": null,
//     "isUSB": false,
//     "isVirtual": false,
//     "logicalBlockSize": 512,
//     "mountpoints": [
//       {
//         "label": null,
//         "path": "/",
//       },
//       {
//         "label": null,
//         "path": "[SWAP]",
//       },
//       {
//         "label": "EFI System Partition",
//         "path": "/boot/efi",
//       },
//     ],
//     "partitionTableType": null,
//     "raw": "/dev/sda",
//     "size": 1000204886016,
//   },
// ]
```
