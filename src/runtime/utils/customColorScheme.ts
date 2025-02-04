import type { CustomColorGroup } from '@material/material-color-utilities'
import { camelCase } from 'change-case'
import type { ModifyColorScheme } from '~/src/types/module'

function formatCustomColorName(
  blueprint: string,
  name: string,
  options?: { suffix: string }
): string {
  const { suffix = '' } = options || {}
  const parts = blueprint
    .split(/(?=[A-Z])/)
    .map((part) => part.toLowerCase().replace('color', camelCase(name)))
  return camelCase(parts.join('_') + suffix)
}

export function toCustomColorScheme(
  colorGroup: CustomColorGroup,
  options?: { isDark: boolean; modifyColorScheme?: ModifyColorScheme }
): Record<string, number> {
  const tokens: Record<string, number> = {}
  const {
    color: { name }
  } = colorGroup

  // Process main colors for the selected theme (dark or light)
  const mainEntries = options?.isDark ? colorGroup.dark : colorGroup.light
  for (const [blueprint, value] of Object.entries(mainEntries)) {
    const token = formatCustomColorName(blueprint, name)
    tokens[token] = value
  }

  // Process additional tokens for variants
  const variantSuffixes = ['_light', '_dark']
  for (const suffix of variantSuffixes) {
    const variantType = suffix.slice(1) as 'light' | 'dark'
    for (const [blueprint, value] of Object.entries(colorGroup[variantType])) {
      const token = formatCustomColorName(blueprint, name, { suffix })
      tokens[token] = value as number
    }
  }

  return tokens
}
