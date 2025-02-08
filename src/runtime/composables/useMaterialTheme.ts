import type { MaterialTheme, MaterialThemeOptions } from '../../types/theme'
import { createMaterialTheme} from '../utils/theme'
import { colorSchemeFromTheme } from '../utils/color-scheme'

import { computed, type MaybeRefOrGetter, shallowRef, toValue, watch } from 'vue'
import { watchIgnorable } from '@vueuse/core'

export function useMaterialTheme(options: MaterialThemeOptions, colorSchemeOptions: {
  brightnessVariants?: MaybeRefOrGetter<boolean>
} = {}) {
  const theme = shallowRef<MaterialTheme>(createMaterialTheme(options))
  const isPrimaryDrivenBySeed = shallowRef<boolean>(true)

  const scheme = computed(() => theme.value.schemes[options.isDark ? 'dark' : 'light'])

  const { ignoreUpdates } = watchIgnorable(
    () => [
      options.primary,
      options.isDark,
      options.contrastLevel,
      options.style,
      options.secondary,
      options.tertiary,
      options.neutral,
      options.neutralVariant
    ], () => {
      theme.value = createMaterialTheme(options)
    })

  const setSeedColor = (seedColor: number) => {
    theme.value = createMaterialTheme({
      seedColor,
      contrastLevel: options.contrastLevel,
      style: options.style,
      extendedColors: options.extendedColors
    })
  }

  watch(() => options.seedColor, () => {
    if (typeof options.seedColor === 'undefined') return
    setSeedColor(options.seedColor)
    const scheme = theme.value.schemes[options.isDark ? 'dark' : 'light']
    ignoreUpdates(() => {
      options.primary = isPrimaryDrivenBySeed.value
        ? scheme.sourceColorArgb
        : scheme.primaryPaletteKeyColor
      options.secondary = scheme.secondaryPaletteKeyColor
      options.tertiary = scheme.tertiaryPaletteKeyColor
      options.neutral = scheme.neutralPaletteKeyColor
      options.neutralVariant = scheme.neutralVariantPaletteKeyColor
    })
  })

  const colorScheme = computed(() => colorSchemeFromTheme(theme.value, {
    isDark: options.isDark,
    brightnessVariants: toValue(colorSchemeOptions.brightnessVariants)
  }))

  return {
    theme,
    scheme,
    colorScheme,
    isPrimaryDrivenBySeed,
    setSeedColor,
    ignoreUpdates
  }
}
