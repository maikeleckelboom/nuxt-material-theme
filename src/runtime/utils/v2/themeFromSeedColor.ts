import {
  customColor,
  type CustomColorGroup,
  type DynamicScheme,
  TonalPalette
} from '@material/material-color-utilities'
import { createDynamicScheme } from '../dynamicScheme'
import type { ExtendedColor } from '../../../types/module'
import type { PaletteStyle } from '../constants'
import { colorsFromDynamicScheme } from '../colorScheme'
import { toCustomColorScheme } from '../customColorScheme'

export interface MaterialTheme {
  seedColor: number
  contrastLevel: number
  style: PaletteStyle
  schemes: {
    light: DynamicScheme
    dark: DynamicScheme
  }
  palettes: {
    primary: TonalPalette
    secondary: TonalPalette
    tertiary: TonalPalette
    neutral: TonalPalette
    neutralVariant: TonalPalette
    error: TonalPalette
  }
  staticColors: CustomColorGroup[]
}

export function generateTheme(
  seedColor: number,
  options?: {
    primary?: number
    secondary?: number
    tertiary?: number
    neutral?: number
    neutralVariant?: number
    error?: number
    contrastLevel?: number
    style?: PaletteStyle
    extendedColors?: ExtendedColor[]
  }
) {
  const {
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    error,
    contrastLevel = 0,
    style = 'TonalSpot',
    extendedColors = []
  } = options

  const createTheme = (isDark: boolean = false) =>
    createDynamicScheme({
      seedColor,
      isDark,
      primary,
      secondary,
      tertiary,
      neutral,
      neutralVariant,
      error,
      contrastLevel,
      style
    })

  const generateTonalPalette = (color: number | undefined): TonalPalette =>
    TonalPalette.fromInt(typeof color === 'number' ? color : seedColor)

  return {
    seedColor,
    contrastLevel,
    style,
    schemes: {
      light: createTheme(),
      dark: createTheme(true)
    },
    palettes: {
      primary: generateTonalPalette(primary),
      secondary: generateTonalPalette(secondary),
      tertiary: generateTonalPalette(tertiary),
      neutral: generateTonalPalette(neutral),
      neutralVariant: generateTonalPalette(neutralVariant),
      error: generateTonalPalette(error)
    },
    staticColors: extendedColors.map((color) =>
      customColor(seedColor, {
        ...color,
        blend: !!color.blend
      })
    )
  }
}

export function colorSchemeFromTheme(
  theme: MaterialTheme,
  options: {
    isDark?: boolean
    brightnessVariants?: boolean
  } = {}
) {
  const { isDark = false, brightnessVariants = false } = options
  const scheme = theme.schemes[isDark ? 'dark' : 'light']
  const colorScheme = colorsFromDynamicScheme(scheme)
  const extendedColors = theme.staticColors.map((color) => toCustomColorScheme(color, { isDark }))
  const colors = {
    ...colorScheme,
    ...extendedColors.reduce((acc, val) => ({ ...acc, ...val }), {})
  }
  if (!brightnessVariants) {
    return colors
  }

  const lightColorScheme = colorsFromDynamicScheme(theme.schemes.light, true)
  const darkColorScheme = colorsFromDynamicScheme(theme.schemes.dark, true)

  return {
    ...colors,
    ...lightColorScheme,
    ...darkColorScheme
  }
}
