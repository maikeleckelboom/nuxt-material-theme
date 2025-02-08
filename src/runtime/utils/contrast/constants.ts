export const CONTRAST_LEVELS = {
  Reduced: -1,
  Default: 0,
  Medium: 0.25,
  High: 0.75
} as const

export type ContrastLevelKey = keyof typeof CONTRAST_LEVELS;
export type ContrastLevel = typeof CONTRAST_LEVELS[ContrastLevelKey] | number;

export const CONTRAST_THRESHOLDS = {
  WCAG_AA_NORMAL_TEXT: 4.5,
  WCAG_AA_LARGE_TEXT: 3,
  WCAG_AAA_NORMAL_TEXT: 7,
  WCAG_AAA_LARGE_TEXT: 4.5,
  WCAG_AA_USER_INTERFACE: 3
} as const

export type ContrastThresholdKey = keyof typeof CONTRAST_THRESHOLDS;
export type ContrastThreshold = typeof CONTRAST_THRESHOLDS[ContrastThresholdKey];
