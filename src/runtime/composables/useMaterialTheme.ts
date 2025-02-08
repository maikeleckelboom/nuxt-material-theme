import { computed, type MaybeRefOrGetter, shallowRef, toValue, watch } from 'vue'
import type { MaterialTheme, MaterialThemeOptions } from '../../types'
import { createMaterialTheme } from '../utils/theme'
import { colorSchemeFromTheme } from '../utils/color-scheme'
import { fetchImageBitmap } from '../utils/quantize/image'
import { createQuantizeWorker } from '../workers/quantize'
import { isDoneEvent } from '../workers/quantize/guards'
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

  async function setSeed(seed: number | string | ImageBitmapSource) {
    const worker = createQuantizeWorker()

    const quantizeAndSetSeed = async (source: ImageBitmapSource) => {
      worker.postMessage({ type: 'start', source, desired: 1 })
      worker.onmessage = (event) => {
        if (isDoneEvent(event)) {
          const { rankedSuggestions } = event.data
          const [seedColor] = rankedSuggestions
          options.seedColor = seedColor
          worker.terminate()
        }
      }
    }

    if (typeof seed === 'string' && (seed.startsWith('http') || seed.startsWith('data:') || seed.startsWith('blob:'))) {
      const source = await fetchImageBitmap(seed)
      await quantizeAndSetSeed(source)
    } else if (seed instanceof ImageBitmap) {
      await quantizeAndSetSeed(seed)
    } else if (typeof seed === 'number') {
      setSeedColor(seed)
    } else {
      throw new Error('Invalid seed source')
    }
  }

  return {
    theme,
    scheme,
    colorScheme,
    isPrimaryDrivenBySeed,
    ignoreUpdates,
    setSeedColor,
    setSeed
  }
}
