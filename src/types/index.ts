import type {PaletteStyle} from "./palette-style";
import type {ContrastLevel} from "./contrast";
import type {XOR} from "./helpers";

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
  isAmoled?: boolean;
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
  paletteTones?: number[]
}

/** Only allowed seedColor or primary, not both */
export type ExclusiveDynamicSchemeOptions = BaseDynamicSchemeOptions & XOR<
  { primary: number },
  { seedColor: number }
>;

/** Either seedColor or primary is required, both are allowed */
export type AtLeastOneColorSchemeOptions  = Required<ExclusiveDynamicSchemeOptions> & XOR<
  { primary: number },
  { seedColor: number }
>;
