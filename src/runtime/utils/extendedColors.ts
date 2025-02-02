import type { CustomColorGroup } from '@material/material-color-utilities'
import { changeCase } from '../utils/changeCase'
import { formatToken, type FormatTokenOptions } from './formatToken'

function formatColorName(
  blueprint: string,
  name: string,
  options: FormatTokenOptions = {}
): string {
  const { caseFormat, prefix = '', suffix = '', caseOptions } = options

  const parts = blueprint.split(/(?=[A-Z])/g).map(part =>
    part.toLowerCase().replace('color', changeCase(name, 'camel'))
  )

  return formatToken(parts.join('_'), { caseFormat, caseOptions, prefix, suffix })
}

export function toCustomColorScheme(
  colorGroup: CustomColorGroup,
  isDark: boolean
): Record<string, number> {
  const tokens: Record<string, number> = {}

  // Process main dark/light colors
  Object.entries(colorGroup[isDark ? 'dark' : 'light']).forEach(([blueprint, value]) => {
    const token = formatColorName(blueprint, colorGroup.color.name)
    tokens[token] = value
  });

  // Process additional light and dark colors
  [['light', '_light'], ['dark', '_dark']].forEach(([type, suffix]) => {
    Object.entries(colorGroup[type as 'light' | 'dark']).forEach(([blueprint, value]) => {
      const token = formatColorName(blueprint, colorGroup.color.name, {
        caseFormat: 'camel',
        suffix
      })
      tokens[token] = value as number
    })
  })

  return tokens
}
