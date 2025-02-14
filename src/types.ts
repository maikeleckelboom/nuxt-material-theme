import type { PaletteStyle } from './runtime/utils/palette-style'
import { type CustomColorGroup, DynamicScheme, TonalPalette } from '@material/material-color-utilities'

export interface ExtendedColor {
  name: string
  value: number
  blend?: boolean
}

export interface CorePaletteColors {
  primary?: number
  secondary?: number
  tertiary?: number
  neutral?: number
  neutralVariant?: number
  error?: number
}

export interface BaseDynamicSchemeOptions extends CorePaletteColors {
  style?: PaletteStyle
  contrastLevel?: number
  isDark?: boolean
  isAmoled?: boolean
}

export type DynamicSchemeOptions =
  | (BaseDynamicSchemeOptions & { primary: number; seedColor?: number })
  | (BaseDynamicSchemeOptions & { seedColor: number; primary?: number });

export type ExclusiveDynamicSchemeOptions =
  | (BaseDynamicSchemeOptions & { primary: number; seedColor?: never })
  | (BaseDynamicSchemeOptions & { seedColor: number; primary?: never });

export interface MaterialThemeConfig {
  stateId?: string
  brightnessVariants?: boolean
  primaryDrivenBySeed?: boolean
}

export type MaterialThemeOptions = DynamicSchemeOptions & {
  extendedColors?: ExtendedColor[]
  config?: MaterialThemeConfig
}

export type MaterialThemeRuntimeOptions = Required<MaterialThemeOptions>

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
  customColors: CustomColorGroup[]
}

export type Color = number

export interface MaterialColorScheme {
  primaryPaletteKeyColor: number;
  secondaryPaletteKeyColor: number;
  tertiaryPaletteKeyColor: number;
  neutralPaletteKeyColor: number;
  neutralVariantPaletteKeyColor: number;
  background: number;
  onBackground: number;
  surface: number;
  surfaceDim: number;
  surfaceBright: number;
  surfaceContainerLowest: number;
  surfaceContainerLow: number;
  surfaceContainer: number;
  surfaceContainerHigh: number;
  surfaceContainerHighest: number;
  onSurface: number;
  surfaceVariant: number;
  onSurfaceVariant: number;
  inverseSurface: number;
  inverseOnSurface: number;
  outline: number;
  outlineVariant: number;
  shadow: number;
  scrim: number;
  surfaceTint: number;
  primary: number;
  onPrimary: number;
  primaryContainer: number;
  onPrimaryContainer: number;
  inversePrimary: number;
  secondary: number;
  onSecondary: number;
  secondaryContainer: number;
  onSecondaryContainer: number;
  tertiary: number;
  onTertiary: number;
  tertiaryContainer: number;
  onTertiaryContainer: number;
  error: number;
  onError: number;
  errorContainer: number;
  onErrorContainer: number;
  primaryFixed: number;
  primaryFixedDim: number;
  onPrimaryFixed: number;
  onPrimaryFixedVariant: number;
  secondaryFixed: number;
  secondaryFixedDim: number;
  onSecondaryFixed: number;
  onSecondaryFixedVariant: number;
  tertiaryFixed: number;
  tertiaryFixedDim: number;
  onTertiaryFixed: number;
  onTertiaryFixedVariant: number;
}

export type ColorScheme = Record<keyof MaterialColorScheme, number> & {
  [key: string]: number
}
