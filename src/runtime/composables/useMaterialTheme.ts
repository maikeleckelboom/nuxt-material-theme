import { computed } from 'vue'
import { toColorScheme } from '../utils/colorScheme'
import type { MaterialThemeOptions, ModifyColorSchemeOptions } from '../../types/module'
import { useDynamicScheme } from './useDynamicScheme'

/**
 * A Material Theme that adapts to the given seed color and the provided custom colors.
 */
export function useMaterialTheme(theme: MaterialThemeOptions, options?: ModifyColorSchemeOptions) {
  const dynamicScheme = useDynamicScheme()

  const colorScheme = computed(() => {
    return toColorScheme(dynamicScheme, {
      isExtendedFidelity: theme.isExtendedFidelity,
      isAmoled: theme.withAmoled,
      extendedColors: theme.extendedColors,
      brightnessVariants: theme.includeBrightnessVariants,
      modifyColorScheme: options?.modifyColorScheme
    })
  })

  return {
    dynamicScheme,
    colorScheme
  }
}
