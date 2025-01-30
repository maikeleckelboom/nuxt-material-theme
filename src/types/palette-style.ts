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

function paletteStyleOrdinal(style: PaletteStyle): number {
  return Object.values(PALETTE_STYLE).indexOf(style)
}

export function paletteStyleVariant(style?: PaletteStyle, fallback = PALETTE_STYLE.TonalSpot): number {
  const ordinal = paletteStyleOrdinal(style || fallback)
  return ordinal === -1 ? 0 : ordinal
}
