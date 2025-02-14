import { computed, reactive, shallowRef, useId, watchEffect } from 'vue'
import { createDynamicScheme } from '../utils/dynamic-scheme'
import { generateColorScheme } from '../utils/color-scheme'
import type { PaletteStyle } from '../utils/palette-style'
import { PALETTE_STYLES } from '../utils/palette-style'
import type { DynamicScheme } from '@material/material-color-utilities'
import type { Color, ColorScheme } from '../../types'

const STATE_DEFAULTS = {
  seedColor: 0,
  contrastLevel: 0,
  style: PALETTE_STYLES.TonalSpot,
  isDark: false,
  isAmoled: false
} as const

interface MaterialThemeStateParams {
  initialSeedColor?: Color;
  initialIsDark?: boolean;
  initialIsAmoled?: boolean;
  initialStyle?: PaletteStyle;
  initialContrastLevel?: number;
  initialPrimary?: Color;
  initialSecondary?: Color;
  initialTertiary?: Color;
  initialNeutral?: Color;
  initialNeutralVariant?: Color;
  modifyColorScheme?: (scheme: ColorScheme) => ColorScheme;
}

export interface UseMaterialThemeStateReturn {
  seedColor: Color;
  primary: Color | undefined;
  isDark: boolean;
  isAmoled: boolean;
  style: PaletteStyle;
  contrastLevel: number;
  secondary: Color | undefined;
  tertiary: Color | undefined;
  neutral: Color | undefined;
  neutralVariant: Color | undefined;
  dynamicScheme: DynamicScheme;
  colorScheme: ColorScheme;
}

export function useMaterialThemeState(params?: MaterialThemeStateParams): UseMaterialThemeStateReturn {
  const actualParams = params ?? {}

  // State initialization
  const seedColor = shallowRef(actualParams.initialSeedColor || STATE_DEFAULTS.seedColor)
  const style = shallowRef(actualParams.initialStyle || STATE_DEFAULTS.style)
  const contrastLevel = shallowRef(actualParams.initialContrastLevel || STATE_DEFAULTS.contrastLevel)
  const isDark = shallowRef(actualParams.initialIsDark || STATE_DEFAULTS.isDark)
  const isAmoled = shallowRef(actualParams.initialIsAmoled || STATE_DEFAULTS.isAmoled)
  const primary = shallowRef(actualParams.initialPrimary)
  const secondary = shallowRef(actualParams.initialSecondary)
  const tertiary = shallowRef(actualParams.initialTertiary)
  const neutral = shallowRef(actualParams.initialNeutral)
  const neutralVariant = shallowRef(actualParams.initialNeutralVariant)

  const dynamicScheme = shallowRef<DynamicScheme>(createDynamicScheme({
    seedColor: seedColor.value,
    primary: primary.value,
    secondary: secondary.value,
    tertiary: tertiary.value,
    neutral: neutral.value,
    neutralVariant: neutralVariant.value,
    isDark: isDark.value,
    isAmoled: isAmoled.value,
    style: style.value,
    contrastLevel: contrastLevel.value
  }))

  watchEffect(() => {
    console.log('Recomputing color scheme')

    const scheme = createDynamicScheme({
      seedColor: seedColor.value,
      primary: primary.value,
      secondary: secondary.value,
      tertiary: tertiary.value,
      neutral: neutral.value,
      neutralVariant: neutralVariant.value,
      isDark: isDark.value,
      isAmoled: isAmoled.value,
      style: style.value,
      contrastLevel: contrastLevel.value
    })

    primary.value = scheme.primaryPaletteKeyColor
    secondary.value = scheme.secondaryPaletteKeyColor
    tertiary.value = scheme.tertiaryPaletteKeyColor
    neutral.value = scheme.neutralPaletteKeyColor
    neutralVariant.value = scheme.neutralVariantPaletteKeyColor

    dynamicScheme.value = scheme
  })

  const baseColorScheme = computed(() =>
    generateColorScheme(dynamicScheme.value, { brightnessVariants: false })
  )

  const colorScheme = computed(() => {
    let scheme = { ...baseColorScheme.value }

    if (actualParams.modifyColorScheme) {
      const modified = actualParams.modifyColorScheme(scheme)
      if (modified) return modified
    }

    return scheme
  })

  return reactive({
    seedColor,
    primary,
    isDark,
    isAmoled,
    style,
    contrastLevel,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    dynamicScheme,
    colorScheme
  })
}

// Example usage in a component
/*
const theme = useMaterialThemeState({
  initialSeedColor: '#6750A4',
  initialIsDark: false,
  initialIsAmoled: false,
  initialStyle: PaletteStyle.TONAL_SPOT,
  initialContrastLevel: 0,
  modifyColorScheme: (scheme) => ({
    ...scheme,
    primary: lighten(scheme.primary, 0.1),
  }),
});
*/
