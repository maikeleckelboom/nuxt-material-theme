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
} from '@material/material-color-utilities'

export const PALETTE_STYLE = {
  Monochrome: 'Monochrome',
  Neutral: 'Neutral',
  TonalSpot: 'TonalSpot',
  Vibrant: 'Vibrant',
  Expressive: 'Expressive',
  Fidelity: 'Fidelity',
  Content: 'Content',
  Rainbow: 'Rainbow',
  FruitSalad: 'FruitSalad'
} as const

export type PaletteStyle = typeof PALETTE_STYLE[keyof typeof PALETTE_STYLE];

export function paletteStyleVariant(style?: PaletteStyle, fallback = PALETTE_STYLE.TonalSpot): number {
  const ordinal = Object.values(PALETTE_STYLE).indexOf(style || fallback)
  return ordinal === -1 ? 0 : ordinal
}

const PaletteStyleToScheme = {
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

export type PaletteStyleScheme = typeof PaletteStyleToScheme[keyof typeof PaletteStyleToScheme];

export function paletteStyleScheme(style?: PaletteStyle, fallback: PaletteStyle = PALETTE_STYLE.TonalSpot): PaletteStyleScheme {
  const scheme = PaletteStyleToScheme[style || fallback]
  if (!scheme) {
    throw new Error(`Invalid palette style: ${style}`)
  }
  return scheme
}
