import { useState } from '#app'
import { computed, toValue, watch } from 'vue'
import type { MaterialTheme, MaterialThemeOptions } from '../../types'
import { createMaterialTheme } from '../utils/theme'
import { colorSchemeFromTheme } from '../utils/color-scheme'
import { watchIgnorable } from '@vueuse/core'
import type { QuantizeOptions } from '../workers/quantize/types'
import { quantizePixels, quantizeWithWorker } from '../utils/quantize'
import type { DynamicScheme } from '@material/material-color-utilities'
import { fetchImageBitmap, imageDataFromBitmapSource, pixelsFromImageData } from '../utils/image'
import { score } from '../utils/score'


export async function extractSeedFromImage(
  imageBitmapSource: ImageBitmapSource,
  options: QuantizeOptions = {}
): Promise<number> {
  // Start processing image data for the fallback method early
  const imageDataPromise = imageDataFromBitmapSource(imageBitmapSource)
  try {
    console.log('Try to quantize with worker')
    const { rankedSuggestions } = await quantizeWithWorker(<ImageBitmap>imageBitmapSource, options)
    const [seedColor] = rankedSuggestions
    return seedColor
  } catch {
    // Use the already-started image data processing
    console.log('Fallback to main thread quantization')
    const imageData = await imageDataPromise
    const pixels = pixelsFromImageData(imageData)
    const colorToCount = quantizePixels(pixels)
    const [seedColor] = score(colorToCount)
    return seedColor
  }
}

export function useMaterialTheme(options: MaterialThemeOptions) {
  const theme = useState<MaterialTheme>(options.config?.stateId || 'theme', () => createMaterialTheme(options))

  const dynamicScheme = computed(() => theme.value?.schemes?.[options.isDark ? 'dark' : 'light'])

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

  watch(() => options.seedColor, () => {
    if (typeof options.seedColor === 'undefined') return
    applySeedColor(options.seedColor)
    ignoreUpdates(() => updateOptions(dynamicScheme.value))
  })

  watch(() => options.style, () => {
    applySeedColor(dynamicScheme.value.sourceColorArgb)
  })

  async function applyImage(image: ImageBitmap) {
    const seedColor = await extractSeedFromImage(image)
    applySeedColor(seedColor)
    ignoreUpdates(() => {
      options.seedColor = seedColor
      updateOptions(dynamicScheme.value)
    })
  }

  async function apply(input?: number | string | ImageBitmapSource | null) {
    if (input === null || input === undefined) return

    if (typeof input === 'number') {
      applySeedColor(input)
      return
    }

    let imageBitmap: ImageBitmap
    if (typeof input === 'string') {
      imageBitmap = await fetchImageBitmap(input)
    } else if (input instanceof ImageBitmap) {
      imageBitmap = input
    } else {
      imageBitmap = await createImageBitmap(input)
    }

    await applyImage(imageBitmap)
  }

  const colorScheme = computed(() => colorSchemeFromTheme(theme.value, {
    isDark: options.isDark,
    brightnessVariants: toValue(options?.config?.brightnessVariants)
  }))

  return {
    theme,
    dynamicScheme,
    colorScheme,
    ignoreUpdates,
    apply
  }
}


