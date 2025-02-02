import {
  argbFromHex,
  DynamicColor,
  type DynamicScheme,
  MaterialDynamicColors
} from '@material/material-color-utilities'
import { type MaybeRefOrGetter, toValue } from 'vue'
import type { ModifyColorSchemeOptions } from '../../types/module'
import { colorsFromDynamicScheme } from '../utils/dynamicColor'
import { harmonize } from './blend'

export function toColorScheme(
  dynamicScheme: MaybeRefOrGetter<DynamicScheme>,
  options?: ModifyColorSchemeOptions & {
    isAmoled?: boolean,
    isExtendedFidelity?: boolean,
  }) {
  const { isAmoled = false, isExtendedFidelity = false } = options ?? {}

  const scheme = toValue(dynamicScheme)
  const colors: Record<string, number> = colorsFromDynamicScheme(scheme)

  if (isExtendedFidelity) {
    for (const [name, color] of Object.entries(MaterialDynamicColors)) {
      const excludeWhen = ['error', 'palette']
      const isAllowedToBlend = excludeWhen.every((word) => !name.toLowerCase().includes(word))
      if (color instanceof DynamicColor && isAllowedToBlend) {
        colors[name] = harmonize(color.getArgb(scheme), scheme.sourceColorArgb)
      }
    }
  }

  if (isAmoled) {
    colors.background = argbFromHex('#000000')
    colors.surface = argbFromHex('#000000')
    colors.inverseSurface = argbFromHex('#ffffff')
  }

  return options?.modifyColorScheme ? options.modifyColorScheme(colors) : colors
}
