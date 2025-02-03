import type { DynamicScheme, Hct, TonalPalette } from '@material/material-color-utilities'
import type { ToneDeltaPair } from '@material/material-color-utilities/dynamiccolor/tone_delta_pair'
import type { ContrastCurve } from '@material/material-color-utilities/dynamiccolor/contrast_curve'

interface DynamicColor {
  name: string
  palette: (scheme: DynamicScheme) => TonalPalette
  tone: (scheme: DynamicScheme) => number
  isBackground: boolean
  background?: (scheme: DynamicScheme) => DynamicColor
  secondBackground?: (scheme: DynamicScheme) => DynamicColor
  contrastCurve?: ContrastCurve
  toneDeltaPair?: (scheme: DynamicScheme) => ToneDeltaPair
}

const createDynamicColor = (options: {
  name?: string
  palette: (scheme: DynamicScheme) => TonalPalette
  tone: (scheme: DynamicScheme) => number
  isBackground?: boolean
  background?: (scheme: DynamicScheme) => DynamicColor
  secondBackground?: (scheme: DynamicScheme) => DynamicColor
  contrastCurve?: ContrastCurve
  toneDeltaPair?: (scheme: DynamicScheme) => ToneDeltaPair
}): DynamicColor => ({
  name: options.name || '',
  palette: options.palette,
  tone: options.tone,
  isBackground: options.isBackground ?? false,
  background: options.background,
  secondBackground: options.secondBackground,
  contrastCurve: options.contrastCurve,
  toneDeltaPair: options.toneDeltaPair
})

const getArgb = (color: DynamicColor, scheme: DynamicScheme): number => {
  return getHct(color, scheme).toInt()
}

const getHct = (color: DynamicColor, scheme: DynamicScheme): Hct => {
  const tone = color.tone(scheme)
  const palette = color.palette(scheme)
  return palette.getHct(tone)
}

const foregroundTone = (bgTone: number, ratio: number): number => {
  return Math.max(0, Math.min(100, bgTone + (ratio > 1 ? 10 : -10)))
}

const tonePrefersLightForeground = (tone: number): boolean => tone >= 60

const toneAllowsLightForeground = (tone: number): boolean => tone <= 49

const enableLightForeground = (tone: number): number =>
  tone >= 40 && tone <= 60 ? 49 : tone

export {
  createDynamicColor,
  getArgb,
  getHct,
  foregroundTone,
  tonePrefersLightForeground,
  toneAllowsLightForeground,
  enableLightForeground
}
