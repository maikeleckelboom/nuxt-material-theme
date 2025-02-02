import type { PaletteStyle } from './paletteStyle'
import type { ContrastLevel } from './contrastLevel'

export interface ExtendedColor {
  name: string
  value: number
  blend?: boolean
  description?: string
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
  contrastLevel?: ContrastLevel
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
  withAmoled?: boolean
  isExtendedFidelity?: boolean
  extendedColors?: ExtendedColor[]
  includeBrightnessVariants?: boolean
}

export type ModifyColorSchemeOptions<T = number> = Partial<{
  modifyColorScheme(scheme: Record<string, number>): Record<string, T>
}>

export type MaterialThemeRuntimeOptions = Required<MaterialThemeOptions>
