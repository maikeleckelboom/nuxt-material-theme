import {
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant
} from "@material/material-color-utilities";

export const PALETTE_STYLE = {
  Monochrome: 'monochrome',
  Neutral: 'neutral',
  TonalSpot: 'tonalSpot',
  Vibrant: 'vibrant',
  Expressive: 'expressive',
  Fidelity: 'fidelity',
  Content: 'content',
  Rainbow: 'rainbow',
  FruitSalad: 'fruitSalad'
} as const

export type PaletteStyle = typeof PALETTE_STYLE[keyof typeof PALETTE_STYLE];

export function paletteStyleVariant(style?: PaletteStyle, fallback = PALETTE_STYLE.TonalSpot): number {
  const ordinal = Object.values(PALETTE_STYLE).indexOf(style || fallback)
  return ordinal === -1 ? 0 : ordinal
}

const PALETTE_STYLE_SCHEMES = {
  [PALETTE_STYLE.Monochrome]: SchemeMonochrome,
  [PALETTE_STYLE.Neutral]: SchemeNeutral,
  [PALETTE_STYLE.TonalSpot]: SchemeTonalSpot,
  [PALETTE_STYLE.Vibrant]: SchemeVibrant,
  [PALETTE_STYLE.Expressive]: SchemeExpressive,
  [PALETTE_STYLE.Fidelity]: SchemeFidelity,
  [PALETTE_STYLE.Content]: SchemeContent,
  [PALETTE_STYLE.Rainbow]: SchemeRainbow,
  [PALETTE_STYLE.FruitSalad]: SchemeFruitSalad
} as const

export type PaletteScheme = typeof PALETTE_STYLE_SCHEMES[keyof typeof PALETTE_STYLE_SCHEMES];

export function getSchemeForPaletteStyle(style: PaletteStyle, fallback: PaletteStyle = PALETTE_STYLE.TonalSpot): PaletteScheme {
  return PALETTE_STYLE_SCHEMES[style || fallback];
}
