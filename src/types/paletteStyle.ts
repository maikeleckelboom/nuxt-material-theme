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
} as const;

export type PaletteStyle = typeof PALETTE_STYLE[keyof typeof PALETTE_STYLE];
