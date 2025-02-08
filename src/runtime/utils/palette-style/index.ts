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
import { PALETTE_STYLES, type PaletteStyle } from './constants'

const paletteStyleToSchemeMap = {
  [PALETTE_STYLES.Monochrome]: SchemeMonochrome,
  [PALETTE_STYLES.Neutral]: SchemeNeutral,
  [PALETTE_STYLES.TonalSpot]: SchemeTonalSpot,
  [PALETTE_STYLES.Vibrant]: SchemeVibrant,
  [PALETTE_STYLES.Expressive]: SchemeExpressive,
  [PALETTE_STYLES.Fidelity]: SchemeFidelity,
  [PALETTE_STYLES.Content]: SchemeContent,
  [PALETTE_STYLES.Rainbow]: SchemeRainbow,
  [PALETTE_STYLES.FruitSalad]: SchemeFruitSalad
} as const

export type PaletteScheme =
  (typeof paletteStyleToSchemeMap)[keyof typeof paletteStyleToSchemeMap]

export function getPaletteScheme(
  style?: PaletteStyle,
  fallbackStyle: PaletteStyle = PALETTE_STYLES.TonalSpot
): PaletteScheme {
  const scheme = paletteStyleToSchemeMap [style || fallbackStyle]
  if (!scheme) {
    throw new Error(`Invalid palette style: ${style}`)
  }
  return scheme
}

export function getAvailablePaletteStyles(): string[] {
  return Object.keys(paletteStyleToSchemeMap)
}
