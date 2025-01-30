export const CONTRAST_THRESHOLD = {
  Reduced: -1,
  Default: 0,
  Medium: 0.25,
  High: 0.75
} as const

export type ContrastThreshold = (typeof CONTRAST_THRESHOLD)[keyof typeof CONTRAST_THRESHOLD];
export type ContrastLevel = ContrastThreshold | number;

export const  WCAG_CONTRAST_LEVEL = {
  WCAG_AA_NORMAL_TEXT: 4.5,
  WCAG_AA_LARGE_TEXT: 3,
  WCAG_AAA_NORMAL_TEXT: 7,
  WCAG_AAA_LARGE_TEXT: 4.5,
  WCAG_AA_USER_INTERFACE: 3,
} as const;

export type WCAGContrastLevel = keyof typeof WCAG_CONTRAST_LEVEL;
export type WCAGContrastLevelValue = (typeof WCAG_CONTRAST_LEVEL)[keyof typeof WCAG_CONTRAST_LEVEL];
