import { Hct } from '@material/material-color-utilities'

export function toHct(argb: number): Hct {
  return Hct.fromInt(argb)
}

export function fromHct(hct: Hct): number {
  return hct.toInt()
}

export function toHcts(argbColors: number[]): Hct[] {
  return argbColors.map(toHct)
}

export function fromHcts(hcts: Hct[]): number[] {
  return hcts.map(fromHct)
}
