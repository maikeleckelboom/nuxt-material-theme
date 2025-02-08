import type { CustomColorGroup } from '@material/material-color-utilities'
import { camelCase } from 'change-case'

export function formatCustomColorName(
  blueprint: string,
  customColorName: string,
  options: { suffix?: string } = {}
): string {
  const blueprintParts = blueprint.split(/(?=[A-Z])/)

  const processedParts = blueprintParts.map((part) => {
    const lowerCasePart = part.toLowerCase()
    return lowerCasePart.replace('color', camelCase(customColorName))
  })

  const { suffix = '' } = options
  const joinedString = processedParts.join('_') + suffix

  return camelCase(joinedString)
}

export function colorSchemeFromCustomColorGroup(
  colorGroup: CustomColorGroup,
  options: { isDark?: boolean; brightnessVariants?: boolean } = {}
): Record<string, number> {
  const { isDark = false, brightnessVariants = true } = options
  const colorTokens: Record<string, number> = {}
  const baseColorName = colorGroup.color.name

  const themeColors = isDark ? colorGroup.dark : colorGroup.light
  for (const [colorKey, colorValue] of Object.entries(themeColors)) {
    const tokenName = formatCustomColorName(colorKey, baseColorName)
    colorTokens[tokenName] = colorValue
  }

  if (brightnessVariants) {
    const BRIGHTNESS_VARIANT_SUFFIXES = ['_light', '_dark'] as const
    for (const suffix of BRIGHTNESS_VARIANT_SUFFIXES) {
      const variantType = suffix.slice(1) as 'light' | 'dark'
      const variantColors = colorGroup[variantType]

      for (const [colorKey, colorValue] of Object.entries(variantColors)) {
        const tokenName = formatCustomColorName(colorKey, baseColorName, { suffix })
        colorTokens[tokenName] = colorValue
      }
    }
  }

  return colorTokens
}
