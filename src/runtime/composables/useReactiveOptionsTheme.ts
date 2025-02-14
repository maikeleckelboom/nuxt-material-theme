import { computed, shallowRef, toValue, watch } from 'vue'
import type { MaterialTheme, MaterialThemeOptions } from '../../types'
import { createMaterialTheme } from '../utils/theme'
import { colorSchemeFromTheme } from '../utils/color-scheme'
import { watchIgnorable } from '@vueuse/core'
import type { DynamicScheme } from '@material/material-color-utilities'
import { extractSeedFromImage, fetchImageBitmap } from '../utils/image'


export function useReactiveOptionsTheme(options: MaterialThemeOptions) {
  const theme = shallowRef<MaterialTheme>(createMaterialTheme(options))

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

  function updateOptions(scheme: DynamicScheme) {
    options.primary = toValue(options.config?.primaryDrivenBySeed)
      ? scheme.sourceColorArgb
      : scheme.primaryPaletteKeyColor
    options.secondary = scheme.secondaryPaletteKeyColor
    options.tertiary = scheme.tertiaryPaletteKeyColor
    options.neutral = scheme.neutralPaletteKeyColor
    options.neutralVariant = scheme.neutralVariantPaletteKeyColor
  }

  watch(() => options.seedColor, (seedColor) => {
    if (typeof seedColor === 'undefined') return
    applySeedColor(seedColor)
    ignoreUpdates(() => updateOptions(dynamicScheme.value))
  })

  watch(() => options.style, () => {
    applySeedColor(dynamicScheme.value.sourceColorArgb)
  })

  const colorScheme = computed(() => colorSchemeFromTheme(theme.value, {
    isDark: options.isDark,
    brightnessVariants: toValue(options?.config?.brightnessVariants)
  }))

  async function applyImage(image: ImageBitmap) {
    const seedColor = await extractSeedFromImage(image)
    applySeedColor(seedColor)
    ignoreUpdates(() => {
      options.seedColor = seedColor
      updateOptions(dynamicScheme.value)
    })
  }

  async function apply(input?: number | string | ImageBitmap | null) {
    if (input === null || input === undefined) return
    if (typeof input === 'number') return applySeedColor(input)
    if (typeof input === 'string') input = await fetchImageBitmap(input)
    await applyImage(input)
  }

  return {
    theme,
    dynamicScheme,
    colorScheme,
    ignoreUpdates,
    apply
  }
}


