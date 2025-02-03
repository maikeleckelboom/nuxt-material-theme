import { computed, useId } from 'vue'
import { watchIgnorable } from '@vueuse/core'
import type { DynamicScheme } from '@material/material-color-utilities'
import { useState } from 'nuxt/app'
import { toColorScheme } from '../utils/colorScheme'
import type { MaterialThemeOptions, ModifyColorScheme } from '../../types/module'
import { createDynamicScheme } from '../../runtime/utils/dynamicScheme'

/**
 * A Material Theme that adapts to the given seed color and the provided custom colors.
 *
 * @param theme - The Material Theme options
 * @param options - The options to modify the color scheme
 */
export function useMaterialTheme(
  theme: MaterialThemeOptions,
  options?: {
    modifyColorScheme?: ModifyColorScheme
  }
) {
  const uuid = useId()
  const dynamicScheme = useState<DynamicScheme>(uuid)

  const propsToWatch = [
    'primary',
    'isDark',
    'contrastLevel',
    'style',
    'secondary',
    'tertiary',
    'neutral',
    'neutralVariant'
  ] as const

  const { ignoreUpdates } = watchIgnorable(
    propsToWatch.map((prop) => () => theme[prop]),
    () => {
      dynamicScheme.value = createDynamicScheme(theme)
    },
    { immediate: true }
  )

  const { ignoreUpdates: ignoreSeedUpdates } = watchIgnorable(
    () => theme.seedColor,
    () => {
      const scheme = createDynamicScheme({
        seedColor: Number(theme.seedColor || theme.primary),
        isDark: theme.isDark,
        style: theme.style,
        contrastLevel: theme.contrastLevel
      })

      ignoreUpdates(() => {
        theme.primary = scheme.primaryPaletteKeyColor
        theme.secondary = scheme.secondaryPaletteKeyColor
        theme.tertiary = scheme.tertiaryPaletteKeyColor
        theme.neutral = scheme.neutralPaletteKeyColor
        theme.neutralVariant = scheme.neutralVariantPaletteKeyColor
      })

      dynamicScheme.value = scheme
    }
  )

  const colorScheme = computed(() => {
    if (!dynamicScheme.value) return {}
    return toColorScheme(dynamicScheme.value, {
      isExtendedFidelity: theme.isExtendedFidelity,
      isAmoled: theme.withAmoled,
      extendedColors: theme.extendedColors,
      brightnessVariants: theme.brightnessVariants,
      modifyColorScheme: options?.modifyColorScheme
    })
  })

  return {
    dynamicScheme,
    colorScheme,
    ignoreSeedUpdates,
    ignoreUpdates
  }
}
