import { DynamicColor, type DynamicScheme, MaterialDynamicColors } from '@material/material-color-utilities'
import { isProxy, toRaw } from 'vue'

export function listMaterialDynamicColors() {
  const colors: Record<string, DynamicColor> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      colors[name] = color
    }
  }
  return colors
}

export function colorsFromDynamicScheme(dynamicScheme: DynamicScheme) {
  const scheme = isProxy(dynamicScheme) ? toRaw(dynamicScheme) : dynamicScheme
  const colors: Record<string, number> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      colors[name] = color.getArgb(scheme)
    }
  }
  return colors
}


