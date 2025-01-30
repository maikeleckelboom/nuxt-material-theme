export const PaletteStyle = {
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

export type PaletteStyle = typeof PaletteStyle[keyof typeof PaletteStyle];
