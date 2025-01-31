import {
  argbFromLstar,
  Contrast,
  type DynamicColor,
  type DynamicScheme,
  lstarFromArgb
} from '@material/material-color-utilities'

export function clampTone(tone: number): number {
  return Math.min(Math.max(tone, 0), 100)
}

export function getContrastColor(argb: number): number {
  const BASE_TONE = clampTone(lstarFromArgb(argb))

  // Binary search for maximum achievable contrast in both directions
  const darkestPossible = findMaxContrastVariant(BASE_TONE, 'darker')
  const lightestPossible = findMaxContrastVariant(BASE_TONE, 'lighter')

  // Calculate actual contrast ratios using the proper formula
  const darkContrast = Contrast.ratioOfTones(BASE_TONE, darkestPossible)
  const lightContrast = Contrast.ratioOfTones(BASE_TONE, lightestPossible)

  // Select best contrast with preference for dark-on-light when equal
  return selectOptimalContrast(darkContrast, lightContrast, darkestPossible, lightestPossible)
}

export function getDynamicColorContrastColor(dynamicColor: DynamicColor, scheme: DynamicScheme, contrastRatio: number = 4.5): number {
  const BASE_TONE = clampTone(dynamicColor.tone(scheme))
  const SAFE_RATIO = Math.min(Math.max(contrastRatio, 1), 21)

  const darkVariant = findContrastVariant(BASE_TONE, SAFE_RATIO, 'darker')
  if (darkVariant.valid) return argbFromLstar(darkVariant.tone)

  const lightVariant = findContrastVariant(BASE_TONE, SAFE_RATIO, 'lighter')
  if (lightVariant.valid) return argbFromLstar(lightVariant.tone)

  return BASE_TONE <= 50 ? 0xFFFFFFFF : 0xFF000000
}

// Helper functions -----------------------------------------------------------
function findMaxContrastVariant(baseTone: number, direction: 'darker' | 'lighter'): number {
  let low = direction === 'darker' ? 0 : baseTone
  let high = direction === 'darker' ? baseTone : 100
  let bestTone = baseTone

  // Binary search for max contrast within valid range
  while (low <= high) {
    const mid = Math.round((low + high) / 2)
    const ratio = Contrast.ratioOfTones(baseTone, mid)

    if (ratio > 1) {
      bestTone = mid
      if (direction === 'darker') {
        high = mid - 1
      } else {
        low = mid + 1
      }
    } else {
      if (direction === 'darker') {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
  }

  return bestTone
}

function findContrastVariant(
  baseTone: number,
  targetRatio: number,
  direction: 'darker' | 'lighter'
): { tone: number; valid: boolean } {
  const method = direction === 'darker' ? Contrast.darker : Contrast.lighter
  const tone = method(baseTone, targetRatio)

  if (tone !== -1) return { tone, valid: true }

  const unsafeMethod = direction === 'darker'
    ? Contrast.darkerUnsafe
    : Contrast.lighterUnsafe
  const fallbackTone = unsafeMethod(baseTone, targetRatio)
  const actualRatio = Contrast.ratioOfTones(baseTone, fallbackTone)

  return {
    tone: fallbackTone,
    valid: actualRatio >= targetRatio
  }
}

function selectOptimalContrast(
  darkContrast: number,
  lightContrast: number,
  darkTone: number,
  lightTone: number
): number {
  if (darkContrast > lightContrast) {
    return argbFromLstar(darkTone)
  }
  if (lightContrast > darkContrast) {
    return argbFromLstar(lightTone)
  }
  return argbFromLstar(darkTone)
}

export function isLightTone(argbColor: number) {
  const originalTone = lstarFromArgb(argbColor)
  return originalTone > 50
}

export function isDarkTone(argbColor: number) {
  const originalTone = lstarFromArgb(argbColor)
  return originalTone <= 50
}

export function getRatioOfTones(argbColor1: number, argbColor2: number): number {
  const tone1 = lstarFromArgb(argbColor1)
  const tone2 = lstarFromArgb(argbColor2)
  return Contrast.ratioOfTones(tone1, tone2)
}

export function getBestContrastRatio(argbColor: number) {
  const contrastColor = getContrastColor(argbColor)
  return getRatioOfTones(argbColor, contrastColor)
}

export function getContrastRatio(color:number){
  return Math.floor(getBestContrastRatio(color) * 100) / 100
}
