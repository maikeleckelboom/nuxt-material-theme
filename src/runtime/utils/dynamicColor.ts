import { DynamicColor, type DynamicScheme, MaterialDynamicColors } from '@material/material-color-utilities'

export function listMaterialDynamicColors() {
  const colors: Record<string, DynamicColor> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      colors[name] = color
    }
  }
  return colors
}

export function colorsFromDynamicScheme(dynamicScheme: DynamicScheme): Record<string, number> {
  const colors: Record<string, number> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {

    if (color instanceof DynamicColor) {
      colors[name] = color.getArgb(dynamicScheme)
    }
  }
  return colors
}
