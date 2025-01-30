export const Contrast = {
  Reduced: -1,
  Default: 0,
  Medium: 0.25,
  High: 0.75
} as const

export const ContrastLevel = {
  WCAG_AA_NORMAL_TEXT: 4.5,
  WCAG_AA_LARGE_TEXT: 3,
  WCAG_AAA_NORMAL_TEXT: 7,
  WCAG_AAA_LARGE_TEXT: 4.5,
  WCAG_AA_USER_INTERFACE: 3,
} as const;

export type Contrast = (typeof Contrast)[keyof typeof Contrast];

export type WCAGContrastLevel = keyof typeof ContrastLevel;

export type ContrastLevel = (typeof ContrastLevel)[WCAGContrastLevel] | number;

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

export type PaletteStyle = (typeof PaletteStyle)[keyof typeof PaletteStyle];
