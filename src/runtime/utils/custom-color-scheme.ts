import type { CustomColorGroup } from '@material/material-color-utilities'
import { camelCase } from 'change-case'

export function formatCustomColorName(
  blueprint: string,
  customColorName: string,
  options: { suffix?: string } = {}
): string {
  const { suffix = '' } = options
  const formattedName = blueprint
    // Insert underscores before uppercase letters
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    // Replace 'color' with customColorName
    .replace(/color/g, camelCase(customColorName))

  return camelCase(formattedName + suffix)
}

export function colorSchemeFromCustomColorGroup(
  colorGroup: CustomColorGroup,
  { isDark = false, brightnessVariants = true } = {}
): Record<string, number> {
  const baseColorName = colorGroup.color.name

  // Build tokens from the main theme using reduce
  const tokens = Object.entries(isDark ? colorGroup.dark : colorGroup.light).reduce(
    (acc, [key, value]) => {
      acc[formatCustomColorName(key, baseColorName)] = value
      return acc
    },
    {} as Record<string, number>
  )

  // If brightness variants are enabled, add tokens for both variants
  if (brightnessVariants) {
    (['light', 'dark'] as const).forEach(variant => {
      Object.entries(colorGroup[variant]).forEach(([key, value]) => {
        tokens[formatCustomColorName(key, baseColorName, { suffix: `_${variant}` })] = value
      })
    })
  }

  return tokens
}

