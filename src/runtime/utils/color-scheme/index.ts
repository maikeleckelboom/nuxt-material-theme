import { customColor, DynamicColor, DynamicScheme, MaterialDynamicColors } from '@material/material-color-utilities'
import type { ExtendedColor, MaterialTheme } from '../../../types/theme'
import { colorSchemeFromCustomColorGroup } from './custom'

export function extractColorsFromDynamicScheme(
  dynamicScheme: DynamicScheme,
  appendBrightnessSuffix: boolean = false
): Record<string, number> {
  const colors: Record<string, number> = {}

  for (const [colorName, ColorClass] of Object.entries(MaterialDynamicColors)) {
    // Skip non-DynamicColor entries
    if (!(ColorClass instanceof DynamicColor)) {
      continue
    }

    // Calculate brightness suffix if needed (e.g. "Light" or "Dark")
    const brightnessSuffix = appendBrightnessSuffix
      ? dynamicScheme.isDark ? 'Dark' : 'Light'
      : ''

    // Avoid adding suffix to palette colors to prevent duplication of static colors
    const isPaletteColor = colorName.toLowerCase().includes('palette')
    if (appendBrightnessSuffix && isPaletteColor) {
      continue
    }

    // Generate final color name and store ARGB value
    const resolvedColorName = `${colorName}${brightnessSuffix}`
    colors[resolvedColorName] = ColorClass.getArgb(dynamicScheme)
  }

  return colors
}

export function colorSchemeFromDynamicScheme(
  scheme: DynamicScheme,
  extendedColors: ExtendedColor[],
  options?: { brightnessVariants?: boolean }
): Record<string, number>;

export function colorSchemeFromDynamicScheme(
  scheme: DynamicScheme,
  options?: { brightnessVariants?: boolean }
): Record<string, number>;

export function colorSchemeFromDynamicScheme(
  scheme: DynamicScheme,
  extendedColorsOrOptions?: ExtendedColor[] | { brightnessVariants?: boolean },
  options?: { brightnessVariants?: boolean }
): Record<string, number> {
  let extendedColors: ExtendedColor[] = []
  let opts: { brightnessVariants?: boolean } = {}

  // Determine if the second argument is ExtendedColor[] or options
  if (Array.isArray(extendedColorsOrOptions)) {
    extendedColors = extendedColorsOrOptions
    opts = options ?? {}
  } else {
    opts = extendedColorsOrOptions ?? {}
  }

  const { brightnessVariants = true } = opts
  const isDark = scheme.isDark

  const colors: Record<string, number> = {}

  Object.assign(colors, extractColorsFromDynamicScheme(scheme))

  Object.assign(colors, extendedColors.reduce((acc, extendedColor) => ({
    ...acc,
    ...colorSchemeFromCustomColorGroup(customColor(scheme.sourceColorArgb, {
      name: extendedColor.name,
      value: extendedColor.value,
      blend: !!extendedColor.blend
    }), { isDark, brightnessVariants })
  }), {}))

  if (brightnessVariants) {
    const otherScheme = new DynamicScheme({ ...scheme, isDark: !scheme.isDark })
    Object.assign(colors, extractColorsFromDynamicScheme(scheme, true))
    Object.assign(colors, extractColorsFromDynamicScheme(otherScheme, true))
  }

  return colors
}

export function colorSchemeFromTheme(
  theme: MaterialTheme,
  options: {
    isDark?: boolean
    brightnessVariants?: boolean
  } = {}
) {
  const { isDark = false, brightnessVariants = false } = options

  const dynamicScheme = theme.schemes[isDark ? 'dark' : 'light']

  const colorScheme = colorSchemeFromDynamicScheme(dynamicScheme, { brightnessVariants })

  const extendedColors = theme.customColors.map((customColorGroup) =>
    colorSchemeFromCustomColorGroup(customColorGroup, { isDark, brightnessVariants })
  )

  return {
    ...colorScheme,
    ...extendedColors.reduce((acc, val) => ({ ...acc, ...val }), {})
  }
}
