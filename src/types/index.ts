import type {PaletteStyle} from "./palette-style";
import type {ContrastLevel} from "./contrast";

export interface CorePaletteColors {
  primary?: number
  secondary?: number
  tertiary?: number
  neutral?: number
  neutralVariant?: number
  error?: number
}

export interface DynamicSchemeOptions extends CorePaletteColors {
  seedColor?: number;
  isDark?: boolean
  isAmoled?: boolean
  style?: PaletteStyle,
  contrast?: ContrastLevel
}

export interface ExtendedColor {
  name: string
  value: number
  blend?: boolean
  description?: string
}

export interface MaterialDynamicOptions extends DynamicSchemeOptions {
  extended?: ExtendedColor[]
  paletteTones?: number[]
}
