import { argbFromLstar, Contrast, lstarFromArgb } from '@material/material-color-utilities'

function findMaxContrastVariant(baseTone: number, direction: 'darker' | 'lighter'): number {
  const isDarker = direction === 'darker'
  let [low, high] = isDarker ? [0, baseTone] : [baseTone, 100]
  let bestTone = baseTone

  while (low <= high) {
    const mid = Math.round((low + high) / 2)
    const ratio = Contrast.ratioOfTones(baseTone, mid)

    if (ratio > 1) {
      bestTone = mid
      isDarker ? (high = mid - 1) : (low = mid + 1)
    } else {
      isDarker ? (low = mid + 1) : (high = mid - 1)
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
  return argbFromLstar(darkContrast >= lightContrast ? darkTone : lightTone)
}

export function contrastColor(color: number): number {
  const BASE_TONE = Math.min(Math.max(lstarFromArgb(color), 0), 100)
  const [darkestTone, lightestTone] = (['darker', 'lighter'] as const)
    .map(dir => findMaxContrastVariant(BASE_TONE, dir))

  return selectOptimalContrast(
    Contrast.ratioOfTones(BASE_TONE, darkestTone),
    Contrast.ratioOfTones(BASE_TONE, lightestTone),
    darkestTone,
    lightestTone
  )
}

export function contrastColorWithRatio(color: number, ratio: number = 4.5): number {
  const BASE_TONE = Math.min(Math.max(lstarFromArgb(color), 0), 100)
  const darkestTone = findMaxContrastVariant(BASE_TONE, 'darker')
  const lightestTone = findMaxContrastVariant(BASE_TONE, 'lighter')
  const darkRatio = Contrast.ratioOfTones(BASE_TONE, darkestTone)
  const lightRatio = Contrast.ratioOfTones(BASE_TONE, lightestTone)

  if (darkRatio >= ratio && lightRatio >= ratio) {
    return selectOptimalContrast(darkRatio, lightRatio, darkestTone, lightestTone)
  }

  return darkRatio >= lightRatio ? argbFromLstar(darkestTone) : argbFromLstar(lightestTone)
}

export function contrastColorWithExactContrastRatio(color: number, ratio: number = 4.5): number {
  // Find the least-darkest tone that satisfies the ratio, then find the lightest tone that satisfies the ratio
  // and return the one that is closest to the base tone
  const BASE_TONE = Math.min(Math.max(lstarFromArgb(color), 0), 100)
  const darkestTone = findMaxContrastVariant(BASE_TONE, 'darker')
  const lightestTone = findMaxContrastVariant(BASE_TONE, 'lighter')
  const darkRatio = Contrast.ratioOfTones(BASE_TONE, darkestTone)
  const lightRatio = Contrast.ratioOfTones(BASE_TONE, lightestTone)

  if (darkRatio >= ratio && lightRatio >= ratio) {
    return selectOptimalContrast(darkRatio, lightRatio, darkestTone, lightestTone)
  }

  // If the base tone is already at the lightest or darkest tone, return the lightest or darkest tone
  if (BASE_TONE === darkestTone || BASE_TONE === lightestTone) {
    return BASE_TONE === darkestTone ? argbFromLstar(darkestTone) : argbFromLstar(lightestTone)
  }

  // If the base tone is closer to the darkest tone, return the darkest tone
  if (BASE_TONE - darkestTone < lightestTone - BASE_TONE) {
    return argbFromLstar(darkestTone)
  }

  // If the base tone is closer to the lightest tone, return the lightest tone
  return argbFromLstar(lightestTone)
}

export function ratioOfTones(color1: number, color2: number): number {
  const tone1 = lstarFromArgb(color1)
  const tone2 = lstarFromArgb(color2)
  return Contrast.ratioOfTones(tone1, tone2)
}

export function contrastRatio(color1: number, color2: number): number {
  return Math.floor(ratioOfTones(color1, color2) * 100) / 100
}

export function maxContrastRatio(color: number): number {
  return Math.floor(ratioOfTones(color, contrastColor(color)) * 100) / 100
}
