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

export type PaletteStyle = (typeof PALETTE_STYLE)[keyof typeof PALETTE_STYLE]

export function paletteStyleVariant(
  style?: PaletteStyle,
  fallback = PALETTE_STYLE.TonalSpot
): number {
  const ordinal = Object.values(PALETTE_STYLE).indexOf(style || fallback)
  return ordinal === -1 ? 0 : ordinal
}
