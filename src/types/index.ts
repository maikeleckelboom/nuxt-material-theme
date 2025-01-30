import type {ContrastLevel, PaletteStyle} from "../runtime/constants/contrast";

export interface CorePaletteColors {
  primary?: number
  secondary?: number
  tertiary?: number
  neutral?: number
  neutralVariant?: number
}

export interface DynamicSchemeOptions extends CorePaletteColors {
  source: number
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
