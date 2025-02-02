import {
  DynamicColor,
  type DynamicScheme,
  MaterialDynamicColors
} from '@material/material-color-utilities'

export function colorsFromDynamicScheme(
  dynamicScheme: DynamicScheme,
  applyBrightnessSuffix: boolean = false
): Record<string, number> {
  const colors: Record<string, number> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      const suffix = applyBrightnessSuffix
        ? dynamicScheme.isDark
          ? 'Dark'
          : 'Light'
        : ''
      if (suffix && name.toLowerCase().includes('palette')) {
        continue
      }
      colors[`${name}${suffix}`] = color.getArgb(dynamicScheme)
    }
  }
  return colors
}

export function listMaterialDynamicColors() {
  const colors: Record<string, DynamicColor> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      colors[name] = color
    }
  }
  return colors
}
