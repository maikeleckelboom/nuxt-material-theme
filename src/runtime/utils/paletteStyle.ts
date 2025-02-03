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
import { PALETTE_STYLE, type PaletteStyle } from './constants'

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

export type PaletteStyleScheme =
  (typeof PaletteStyleToScheme)[keyof typeof PaletteStyleToScheme]

export function paletteStyleScheme(
  style?: PaletteStyle,
  fallbackStyle: PaletteStyle = PALETTE_STYLE.TonalSpot
): PaletteStyleScheme {
  const scheme = PaletteStyleToScheme[style || fallbackStyle]
  if (!scheme) {
    throw new Error(`Invalid palette style: ${style}`)
  }
  return scheme
}

export function listPaletteStyles(): string[] {
  return Object.keys(PaletteStyleToScheme)
}
