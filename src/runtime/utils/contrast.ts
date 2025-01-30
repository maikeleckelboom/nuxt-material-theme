import {argbFromLstar, Contrast, lstarFromArgb} from "@material/material-color-utilities";
import {CONTRAST} from "../../types/contrast";

function findMaxContrastVariant(baseTone: number, direction: 'darker' | 'lighter'): number {
  let low = direction === 'darker' ? 0 : baseTone;
  let high = direction === 'darker' ? baseTone : 100;
  let bestTone = baseTone;

  while (low <= high) {
    const mid = Math.round((low + high) / 2);
    const ratio = Contrast.ratioOfTones(baseTone, mid);

    if (ratio > 1) bestTone = mid;

    if (ratio > 1) {
      high = direction === 'darker' ? mid - 1 : high;
      low = direction === 'lighter' ? mid + 1 : low;
    } else {
      low = mid + 1;
      high = mid - 1;
    }
  }

  return bestTone;
}

function selectOptimalContrast(darkContrast: number, lightContrast: number, darkTone: number, lightTone: number): number {
  if (darkContrast > lightContrast) return argbFromLstar(darkTone);
  if (lightContrast > darkContrast) return argbFromLstar(lightTone);
  return argbFromLstar(lightTone);
}

export function clampTone(tone: number): number {
  return Math.min(Math.max(tone, 0), 100);
}

export function getBestContrastColor(argb: number): number {
  const BASE_TONE = clampTone(lstarFromArgb(argb));
  const darkestPossible = findMaxContrastVariant(BASE_TONE, 'darker');
  const lightestPossible = findMaxContrastVariant(BASE_TONE, 'lighter');
  const darkContrast = Contrast.ratioOfTones(BASE_TONE, darkestPossible);
  const lightContrast = Contrast.ratioOfTones(BASE_TONE, lightestPossible);
  return selectOptimalContrast(darkContrast, lightContrast, darkestPossible, lightestPossible);
}

export function calculateContrastRatio(color1: number, color2: number): number {
  const tone1 = lstarFromArgb(color1);
  const tone2 = lstarFromArgb(color2);
  return Contrast.ratioOfTones(tone1, tone2);
}

export function isLightTone(argbColor: number) {
  const originalTone = lstarFromArgb(argbColor);
  return originalTone > 50;
}

export function isDarkTone(argbColor: number) {
  const originalTone = lstarFromArgb(argbColor);
  return originalTone <= 50;
}

export function hasEnoughContrast(color1: number, color2: number, threshold: number = CONTRAST.Medium): boolean {
  return calculateContrastRatio(color1, color2) >= threshold;
}

export function calculateBestContrastRatio(color: number) {
  const contrastColor = getBestContrastColor(color);
  return calculateContrastRatio(color, contrastColor);
}

export function roundRatio(value: number): number {
  return Math.round(value * 100) / 100;
}

export function contrastRatioWCAG(color: number) {
  const ratio = calculateBestContrastRatio(color)
  return roundRatio(ratio);
}
