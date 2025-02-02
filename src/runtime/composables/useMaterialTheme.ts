import { computed } from 'vue'
import { customColor } from '@material/material-color-utilities'
import { toColorScheme } from '../utils/colorScheme'
import type { MaterialThemeOptions, ModifyColorSchemeOptions } from '../../types/module'
import { toCustomColorScheme } from '../utils/extendedColors'
import { useDynamicScheme } from './useDynamicScheme'

/**
 * A Material Theme that adapts to the given seed color and the provided custom colors.
 */
export function useMaterialTheme(options: MaterialThemeOptions & ModifyColorSchemeOptions) {

  const dynamicScheme = useDynamicScheme()

  const coreColorScheme = computed(() => {
    return toColorScheme(dynamicScheme, {
      isExtendedFidelity: options.isExtendedFidelity,
      isAmoled: options.withAmoled && options.isDark,
      modifyColorScheme: options.modifyColorScheme
    })
  })

  const extendedColorScheme = computed(() => {
      if (!options.extendedColors?.length) return {}
      const { sourceColorArgb, isDark } = dynamicScheme.value
      return options.extendedColors.reduce((acc, extendedColor) => {
        const customColorGroup = customColor(sourceColorArgb, {
          ...extendedColor,
          blend: !!options.isExtendedFidelity || !!extendedColor.blend
        })
        const customScheme = toCustomColorScheme(customColorGroup, isDark)
        return ({
          ...acc,
          ...customScheme
        })
      }, {})
    }
  )

  const colorScheme = computed(() => ({
    ...coreColorScheme.value,
    ...extendedColorScheme.value
  }))

  return {
    dynamicScheme,
    colorScheme
  }
}
