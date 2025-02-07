import { computed, shallowRef, useId } from 'vue'
import { watchTriggerable } from '@vueuse/core'
import type { DynamicScheme } from '@material/material-color-utilities'
import { useState } from 'nuxt/app'
import { toColorScheme } from '../utils/colorScheme'
import type { MaterialThemeOptions } from '../../types/module'
import { createDynamicScheme } from '../utils/dynamicScheme'

export function useMaterialThemeBuilder(theme: MaterialThemeOptions) {
  const stateId = useId()
  const dynamicScheme = useState<DynamicScheme>(stateId)

  const isBidirectionalSyncEnabled = shallowRef<boolean>(false)

  const syncPrimaryWithSeed = shallowRef<boolean>(false)

  const { ignoreUpdates: ignoreWatcher } = watchTriggerable(
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
      console.log('theme changed')
      dynamicScheme.value = createDynamicScheme(theme)
    },
    { immediate: true }
  )

  watchTriggerable(
    () => theme.seedColor,
    () => {
      console.log('seedColor changed')
      const scheme = createDynamicScheme({
        seedColor: Number(theme.seedColor || 0),
        isDark: theme.isDark,
        style: theme.style,
        contrastLevel: theme.contrastLevel
      })
      ignoreWatcher(() => {
        theme.primary = syncPrimaryWithSeed.value
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
      isAmoled: theme.withAmoled,
      extendedColors: theme.extendedColors,
      brightnessVariants: theme.brightnessVariants
    })
  })

  return {
    dynamicScheme,
    colorScheme,
    syncPrimaryWithSeed,
    isBidirectionalSyncEnabled,
    ignoreWatcher
  }
}
