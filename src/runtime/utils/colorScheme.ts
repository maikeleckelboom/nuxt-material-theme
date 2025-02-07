import {
  argbFromHex,
  customColor,
  DynamicColor,
  DynamicScheme,
  MaterialDynamicColors
} from '@material/material-color-utilities'
import { toValue } from 'vue'
import type { ExtendedColor, ModifyColorScheme } from '../../types/module'
import { toCustomColorScheme } from './customColorScheme'
import { harmonize } from './blend'

export function colorsFromDynamicScheme(
  dynamicScheme: DynamicScheme,
  appendBrightnessSuffix: boolean = false
): Record<string, number> {
  const colors: Record<string, number> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      let suffix = ''
      if (appendBrightnessSuffix) {
        suffix = dynamicScheme.isDark ? 'Dark' : 'Light'
      }
      if (suffix && name.toLowerCase().includes('palette')) {
        continue
      }
      colors[`${name}${suffix}`] = color.getArgb(dynamicScheme)
    }
  }
  return colors
}

export function toColorScheme(
  dynamicScheme: DynamicScheme,
  options?: {
    extendedColors?: ExtendedColor[]
    brightnessVariants?: boolean
    isExtendedFidelity?: boolean
    isAmoled?: boolean
    modifyColorScheme?: ModifyColorScheme
  }
) {
  const {
    extendedColors = [],
    brightnessVariants = true,
    isExtendedFidelity = false,
    isAmoled = false
  } = options ?? {}

  const colors: Record<string, number> = {}

  const scheme = toValue(dynamicScheme)

  Object.assign(colors, colorsFromDynamicScheme(scheme))

  if (brightnessVariants) {
    const otherScheme = new DynamicScheme({ ...scheme, isDark: !scheme.isDark })
    Object.assign(colors, colorsFromDynamicScheme(scheme, true))
    Object.assign(colors, colorsFromDynamicScheme(otherScheme, true))
  }

  if (extendedColors.length) {
    Object.assign(
      colors,
      extendedColors.reduce((acc, extendedColor) => {
        const customColorGroup = customColor(
          scheme.sourceColorArgb,
          Object.assign({}, extendedColor, {
            blend: isExtendedFidelity || !!extendedColor.blend
          })
        )
        const customScheme = toCustomColorScheme(
          customColorGroup,
          Object.assign({ isDark: scheme.isDark }, options)
        )
        return Object.assign({}, acc, customScheme)
      }, {})
    )
  }

  // Apply fidelity modifications (Experimental)
  if (isExtendedFidelity) {
    for (const [name, color] of Object.entries(MaterialDynamicColors)) {
      const nonBlendable = ['error', 'palette']
      const isAllowedToBlend = nonBlendable.every(
        (word) => !name.toLowerCase().includes(word)
      )
      if (color instanceof DynamicColor && isAllowedToBlend) {
        colors[name] = harmonize(color.getArgb(scheme), scheme.sourceColorArgb)
      }
    }
  }

  // Apply AMOLED modifications (Experimental)
  if (scheme.isDark && isAmoled) {
    colors.background = argbFromHex('#000000')
    colors.surface = argbFromHex('#000000')
    colors.inverseSurface = argbFromHex('#ffffff')
  }

  return options?.modifyColorScheme ? options.modifyColorScheme(colors) : colors
}
