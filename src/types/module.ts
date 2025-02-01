import type {PaletteStyle} from "./palette-style";
import type { ContrastLevel } from './contrastLevel'

export interface CorePaletteColors {
  primary?: number;
  secondary?: number;
  tertiary?: number;
  neutral?: number;
  neutralVariant?: number;
  error?: number;
}

export interface BaseDynamicSchemeOptions extends CorePaletteColors {
  isDark?: boolean;
  style?: PaletteStyle;
  contrast?: ContrastLevel;
}

export interface PrimaryDynamicSchemeOptions extends BaseDynamicSchemeOptions {
  primary: number;
  seedColor?: number;
}

export interface SeedColorDynamicSchemeOptions extends BaseDynamicSchemeOptions {
  seedColor: number;
  primary?: number;
}

export type DynamicSchemeOptions = PrimaryDynamicSchemeOptions | SeedColorDynamicSchemeOptions

export interface ExtendedColor {
  name: string
  value: number
  blend?: boolean
  description?: string
}

export type MaterialThemeOptions = DynamicSchemeOptions & {
  extended?: ExtendedColor[]
  /* Not implemented */
  withAmoled?: boolean; // Whether the dark scheme is used with Amoled screen (Pure dark).
  /* Not implemented */
  isExtendedFidelity?: boolean; // Equivalent to "color match" in material.io
}

export type MaterialThemeRuntimeOptions = Required<MaterialThemeOptions>
