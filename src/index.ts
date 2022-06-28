import { platform } from 'os'
import { lsblk } from './lsblk'
import type { Drive } from './types'

export async function list(debug = false): Promise<Drive[]> {
  const plat = platform()
  if (plat === 'linux' || debug)
    return await lsblk(debug)

  throw new Error(`Your OS is not supported by this module: ${platform()}`)
}
