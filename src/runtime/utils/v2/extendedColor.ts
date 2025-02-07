import type { CustomColor } from '@material/material-color-utilities'
import type { ExtendedColor } from '../../../types/module'

export function extendedToCustomColors(extendedColors?: ExtendedColor[], extendFidelity?:boolean): CustomColor[] {
  return (extendedColors || []).map((color) => ({
    name: color.name,
    value: color.value,
    blend: Boolean(color.blend || extendFidelity)
  }))
}
