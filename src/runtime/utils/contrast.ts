import { argbFromLstar, Contrast, lstarFromArgb } from '@material/material-color-utilities'

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

function selectOptimalContrast(
  darkContrast: number,
  lightContrast: number,
  darkTone: number,
  lightTone: number
): number {
  if (darkContrast > lightContrast) return argbFromLstar(darkTone)
  if (lightContrast > darkContrast) return argbFromLstar(lightTone)
  return argbFromLstar(darkTone)
}

export function getContrastColor(argb: number): number {
  // Calculate base tone from input color
  const BASE_TONE = Math.min(Math.max(lstarFromArgb(argb), 0), 100)

  // Binary search for maximum achievable contrast in both directions
  const darkestPossible = findMaxContrastVariant(BASE_TONE, 'darker')
  const lightestPossible = findMaxContrastVariant(BASE_TONE, 'lighter')

  // Calculate actual contrast ratios using the proper formula
  const darkContrast = Contrast.ratioOfTones(BASE_TONE, darkestPossible)
  const lightContrast = Contrast.ratioOfTones(BASE_TONE, lightestPossible)

  // Select best contrast with preference for dark-on-light when equal
  return selectOptimalContrast(darkContrast, lightContrast, darkestPossible, lightestPossible)
}

export function getRatioOfTones(argbColor1: number, argbColor2: number): number {
  const tone1 = lstarFromArgb(argbColor1)
  const tone2 = lstarFromArgb(argbColor2)
  return Contrast.ratioOfTones(tone1, tone2)
}

export function getContrastRatio(color: number) {
  const contrastColor = getContrastColor(color)
  return Math.floor(getRatioOfTones(color, contrastColor) * 100) / 100
}
