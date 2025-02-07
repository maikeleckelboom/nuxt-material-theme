import { computed, watch, shallowRef } from 'vue'
import {  watchIgnorable } from '@vueuse/core'
import type { DynamicScheme } from '@material/material-color-utilities'
import { toColorScheme } from '../utils/colorScheme'
import type { MaterialThemeOptions } from '../../types/module'
import { createDynamicScheme } from '../utils/dynamicScheme'

export function useMaterialThemeBuilder(theme: MaterialThemeOptions) {
  const dynamicScheme = shallowRef<DynamicScheme>()
  //
  const isPrimaryDrivenBySeed = shallowRef<boolean>(false)

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

  watch(
    () => theme.seedColor,
    () => {
      const scheme = createDynamicScheme({
        seedColor: Number(theme.seedColor || 0),
        isDark: theme.isDark,
        style: theme.style,
        contrastLevel: theme.contrastLevel
      })
      ignoreUpdates(() => {
        theme.primary = isPrimaryDrivenBySeed.value
          ? scheme.sourceColorArgb
          : scheme.primaryPaletteKeyColor
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
      isAmoled: theme.isAmoled,
      extendedColors: theme.extendedColors,
      brightnessVariants: theme.brightnessVariants,
    })
  })

  return {
    dynamicScheme,
    colorScheme,
    isPrimaryDrivenBySeed,
    ignoreUpdates
  }
}
