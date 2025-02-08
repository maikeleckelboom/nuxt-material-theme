import { computed, type MaybeRefOrGetter, shallowRef, toValue, watch } from 'vue'
import type { MaterialTheme, MaterialThemeOptions } from '../../types'
import { createMaterialTheme } from '../utils/theme'
import { colorSchemeFromTheme } from '../utils/color-scheme'
import { watchIgnorable } from '@vueuse/core'
import type { QuantizeOptions } from '../workers/quantize/types'
import { quantizeImage } from '../utils/quantize'
import type { DynamicScheme } from '@material/material-color-utilities'

export async function extractSeedFromImage(
  source: ImageBitmap,
  options: QuantizeOptions = {}
): Promise<number> {
  const data = await quantizeImage(source, options)
  const [seedColor] = data.rankedSuggestions
  return seedColor
}

export function useMaterialTheme(options: MaterialThemeOptions, colorSchemeOptions: {
  brightnessVariants?: MaybeRefOrGetter<boolean>
} = {}) {
  const theme = shallowRef<MaterialTheme>(createMaterialTheme(options))
  const isPrimaryDrivenBySeed = shallowRef<boolean>(false)

  const dynamicScheme = computed(() => theme.value.schemes[options.isDark ? 'dark' : 'light'])

  const { ignoreUpdates } = watchIgnorable(
    () => [
      options.primary,
      options.isDark,
      options.contrastLevel,
      options.secondary,
      options.tertiary,
      options.neutral,
      options.neutralVariant,
      options.extendedColors
    ], () => {
      theme.value = createMaterialTheme(options)
    }, { deep: true })

  function applySeedColor(seedColor: number) {
    theme.value = createMaterialTheme({
      seedColor,
      contrastLevel: options.contrastLevel,
      style: options.style,
      extendedColors: options.extendedColors
    })
  }

  watch(() => options.style, () => {
    applySeedColor(dynamicScheme.value.sourceColorArgb)
  })

  function updateOptions(scheme: DynamicScheme) {
    options.primary = isPrimaryDrivenBySeed.value
      ? scheme.sourceColorArgb
      : scheme.primaryPaletteKeyColor
    options.secondary = scheme.secondaryPaletteKeyColor
    options.tertiary = scheme.tertiaryPaletteKeyColor
    options.neutral = scheme.neutralPaletteKeyColor
    options.neutralVariant = scheme.neutralVariantPaletteKeyColor
  }

  watch(() => options.seedColor, () => {
    if (typeof options.seedColor === 'undefined') return
    applySeedColor(options.seedColor)
    ignoreUpdates(() => updateOptions(dynamicScheme.value))
  })

  async function applyImage(imageBitmap: ImageBitmap) {
    const seedColor = await extractSeedFromImage(imageBitmap)
    applySeedColor(seedColor)
    ignoreUpdates(() => {
      options.seedColor = seedColor
      updateOptions(dynamicScheme.value)
    })
  }

  const colorScheme = computed(() => colorSchemeFromTheme(theme.value, {
    isDark: options.isDark,
    brightnessVariants: toValue(colorSchemeOptions.brightnessVariants)
  }))

  return {
    theme,
    dynamicScheme,
    colorScheme,
    isPrimaryDrivenBySeed,
    ignoreUpdates,
    applySeedColor,
    applyImage
  }
}
