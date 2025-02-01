import { DynamicColor, type DynamicScheme, type Hct, MaterialDynamicColors } from '@material/material-color-utilities'
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

export function colorsFromDynamicScheme<Format extends 'argb' | 'hct' = 'argb'>(
  dynamicScheme: DynamicScheme,
  options?: { format?: Format }
): Record<string, Format extends 'argb' ? number : Hct> {
  const format = options?.format ?? ('argb' as Format)
  const scheme = isProxy(dynamicScheme) ? toRaw(dynamicScheme) : dynamicScheme

  return Object.fromEntries(
    Object.entries(MaterialDynamicColors)
      .filter(([, color]) => color instanceof DynamicColor)
      .map(([name, color]) => [name, format === 'argb' ? color.getArgb(scheme) : color.getHct(scheme)])
  ) as Record<string, Format extends 'argb' ? number : Hct>
}
