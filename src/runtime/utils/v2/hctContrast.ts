import { Contrast, Hct } from '@material/material-color-utilities'

export function adjustHctForContrast(baseColor: Hct, referenceColor: Hct, minRatio: number): Hct {
  const baseTone = baseColor.tone
  const refTone = referenceColor.tone
  const needsLighter =
    refTone > baseTone
      ? Contrast.lighter(baseTone, minRatio)
      : Contrast.darker(baseTone, minRatio)

  if (needsLighter !== -1) return Hct.from(baseColor.hue, baseColor.chroma, needsLighter)

  // Fallback to minimal adjustment in the opposite direction
  const fallbackTone =
    refTone > baseTone
      ? Contrast.darkerUnsafe(baseTone, minRatio)
      : Contrast.lighterUnsafe(baseTone, minRatio)
  return Hct.from(baseColor.hue, baseColor.chroma, fallbackTone)
}

export function readableTextColorForHct(backgroundColor: Hct): Hct {
  const bgTone = backgroundColor.tone
  const textTone = bgTone >= 60 ? 0 : 100
  return Hct.from(0, 0, textTone)
}

export function ensureMinContrast(colorA: Hct, colorB: Hct, minRatio: number): [Hct, Hct] {
  const [lighter, darker] = colorA.tone > colorB.tone ? [colorA, colorB] : [colorB, colorA]
  const lighterAdjusted = adjustHctForContrast(lighter, darker, minRatio)
  const darkerAdjusted = adjustHctForContrast(darker, lighterAdjusted, minRatio)
  return [lighterAdjusted, darkerAdjusted]
}

export function generateContrastPalette(baseColor: Hct, steps: number, ratio: number): Hct[] {
  const palette = [baseColor]
  let current = baseColor
  for (let i = 0; i < steps; i++) {
    const nextTone = Contrast.lighter(current.tone, ratio)
    current = Hct.from(
      current.hue,
      current.chroma,
      nextTone !== -1 ? nextTone : Contrast.darkerUnsafe(current.tone, ratio)
    )
    palette.push(current)
  }
  return palette
}

export function optimalHctContrastDirection(baseColor: Hct, targetRatio: number): 'lighter' | 'darker' {
  const lighterTone = Contrast.lighter(baseColor.tone, targetRatio);
  const darkerTone = Contrast.darker(baseColor.tone, targetRatio);

  if (lighterTone === -1) return 'darker';
  if (darkerTone === -1) return 'lighter';

  const deltaLighter = Math.abs(lighterTone - baseColor.tone);
  const deltaDarker = Math.abs(darkerTone - baseColor.tone);

  return deltaLighter < deltaDarker ? 'lighter' : 'darker';
}
