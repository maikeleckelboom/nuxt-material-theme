import type { PaletteStyle } from '../runtime/utils/palette-style'
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
}

export interface PrimaryDynamicSchemeOptions extends BaseDynamicSchemeOptions {
  primary: number
  seedColor?: number
}

export interface SeedColorDynamicSchemeOptions extends BaseDynamicSchemeOptions {
  seedColor: number
  primary?: number
}

export type DynamicSchemeOptions =
  | PrimaryDynamicSchemeOptions
  | SeedColorDynamicSchemeOptions

export type MaterialThemeOptions = DynamicSchemeOptions & {
  extendedColors?: ExtendedColor[]
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

// export type ModifyColorScheme<T = object> = <S extends Record<string, number | string>>(
//   scheme: S
// ) => S & T;

