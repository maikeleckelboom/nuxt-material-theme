import { DynamicColor, type DynamicScheme, type Hct, MaterialDynamicColors } from '@material/material-color-utilities'
import { isProxy, toRaw } from 'vue'
import { harmonize } from './blend'

export function listMaterialDynamicColors() {
  const colors: Record<string, DynamicColor> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      colors[name] = color
    }
  }
  return colors
}


export function toColorScheme(
  dynamicScheme: DynamicScheme,
  options?: {
    isAmoled?: boolean,
    isExtendedFidelity?: boolean,
    modifyColorScheme?: (colors: Record<string, number>) => Record<string, unknown>
  }
) {
  const {
    isAmoled = false,
    isExtendedFidelity = false
  } = options ?? {}

  const colors: Record<string, number> = colorsFromDynamicScheme(dynamicScheme)

  const scheme = getRawScheme(dynamicScheme)

  if (isAmoled) {
    colors.surface = 0x000000
    colors.background = 0x000000
    colors.inverseSurface = 0xffffff
  }

  if (isExtendedFidelity) {
    for (const [name, color] of Object.entries(MaterialDynamicColors)) {
      const excludeWhen = ['error', 'palette']
      const isAllowedToBlend = excludeWhen.every((word) => !name.toLowerCase().includes(word))
      if (color instanceof DynamicColor && isAllowedToBlend) {
        colors[name] = harmonize(color.getArgb(scheme), scheme.sourceColorArgb)
      }
    }
  }

  return options?.modifyColorScheme ? options.modifyColorScheme(colors) : colors
}


export function colorsFromDynamicScheme<Format extends 'argb' | 'hct' = 'argb'>(
  dynamicScheme: DynamicScheme,
  format?: Format
): Record<string, Format extends 'hct' ? Hct : number> {
  const selectedFormat = getSelectedFormat(format)
  const scheme = getRawScheme(dynamicScheme)
  const colors = generateColorEntries(scheme, selectedFormat)
  return colors as Record<string, Format extends 'hct' ? Hct : number>
}

function getSelectedFormat<Format extends 'argb' | 'hct'>(format?: Format): Format {
  return (format ?? 'argb') as Format
}

function getRawScheme(dynamicScheme: DynamicScheme): DynamicScheme {
  return isProxy(dynamicScheme) ? toRaw(dynamicScheme) : dynamicScheme
}

function generateColorEntries(
  scheme: DynamicScheme,
  format: 'argb' | 'hct'
): Record<string, number | Hct> {
  const colors: Record<string, number | Hct> = {}

  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      colors[name] = getColorValue(color, scheme, format)
    }
  }

  return colors
}

function getColorValue(
  color: DynamicColor,
  scheme: DynamicScheme,
  format: 'argb' | 'hct'
): number | Hct {
  return format === 'argb' ? color.getArgb(scheme) : color.getHct(scheme)
}
