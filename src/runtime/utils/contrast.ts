import {Contrast, lstarFromArgb} from "@material/material-color-utilities";
import {ContrastLevel} from "../constants/contrast";

export function contrastRatio(color1: number, color2: number): number {
  const tone1 = lstarFromArgb(color1)
  const tone2 = lstarFromArgb(color2)
  return Contrast.ratioOfTones(tone1, tone2)
}

export function hasEnoughContrast(color1: number, color2: number, threshold: number = ContrastLevel.WCAG_AA_NORMAL_TEXT): boolean {
  return contrastRatio(color1, color2) >= threshold;
}
