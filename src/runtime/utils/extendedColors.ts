import type { CustomColorGroup } from '@material/material-color-utilities'
import { camelize } from '@vueuse/core'
import { formatToken, type FormatTokenOptions } from './formatToken'
import { changeCase } from './changeCase'

// function formatColorName(
//   blueprint: string,
//   name: string,
//   options: FormatOptions = {
//     caseFormat: 'camel'
//   }
// ): string {
//   const { caseFormat, prefix = '', suffix = '', caseOptions } = options
//   const normalizedKey = blueprint.replace(/([a-z])(?=[A-Z])/g, '$1_').toLowerCase()
//   const colorName = normalizedKey.replace(/color/, changeCase(name, 'camel'))
//   return formatToken(colorName, { caseFormat, caseOptions, prefix, suffix })
// }
//
// export function toCustomColorScheme(
//   colorGroup: CustomColorGroup,
//   isDark: boolean
// ): Record<string, number> {
//   const tokens: Record<string, number> = {}
//
//   for (const [blueprint, value] of Object.entries(
//     colorGroup[isDark ? 'dark' : 'light']
//   )) {
//     const token = formatColorName(blueprint, colorGroup.color.name, {
//       caseFormat: 'camel'
//     })
//     tokens[token] = value
//   }
//
//   for (const [blueprint, value] of Object.entries(
//     colorGroup['light']
//   )) {
//     const token = formatColorName(blueprint, colorGroup.color.name, {
//       caseFormat: 'camel',
//       suffix: '_light'
//     })
//     tokens[token] = value
//   }
//
//   for (const [blueprint, value] of Object.entries(
//     colorGroup['dark']
//   )) {
//     const token = formatColorName(blueprint, colorGroup.color.name, {
//       caseFormat: 'camel',
//       suffix: '_dark'
//     })
//     tokens[token] = value
//   }
//
//
//   return tokens
//
// }

function formatColorName(
  blueprint: string,
  name: string,
  options: FormatTokenOptions = {
    caseFormat: 'camel'
  }
): string {
  const { caseFormat, prefix = '', suffix = '', caseOptions } = options

  // Split the blueprint into parts and process each part
  const parts = blueprint.split(/(?=[A-Z])/g).map(part =>
    part.toLowerCase().replace('color', camelize(name))
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
