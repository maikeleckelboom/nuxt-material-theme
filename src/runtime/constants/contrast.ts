export const ContrastThreshold = {
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

export type ContrastThreshold = typeof ContrastThreshold[keyof typeof ContrastThreshold];

export type ContrastLevel = keyof typeof ContrastLevel[keyof typeof ContrastLevel] | number;

