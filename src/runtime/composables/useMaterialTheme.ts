import { computed, useId } from 'vue'
import { watchIgnorable } from '@vueuse/core'
import type { DynamicScheme } from '@material/material-color-utilities'
import { useState } from 'nuxt/app'
import { toColorScheme } from '../utils/colorScheme'
import type { MaterialThemeOptions, ModifyColorSchemeOptions } from '../../types/module'
import { createDynamicScheme } from '../../runtime/utils/dynamicScheme'

/**
 * A Material Theme that adapts to the given seed color and the provided custom colors.
 */
export function useMaterialTheme(
  theme: MaterialThemeOptions,
  options?: ModifyColorSchemeOptions
) {
  const _uuid = useId()
  const dynamicScheme = useState<DynamicScheme>(_uuid)

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

  const { ignoreUpdates } = watchIgnorable(
    () => [
      theme.primary,
      theme.isDark,
      theme.contrastLevel,
      theme.style,
      theme.secondary,
      theme.tertiary,
      theme.neutral,
      theme.neutralVariant
    ],
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

  return {
    dynamicScheme,
    colorScheme,
    ignoreSeedUpdates,
    ignoreUpdates
  }
}
