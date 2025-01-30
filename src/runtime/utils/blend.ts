import {Blend} from "@material/material-color-utilities";

export function blend(designColor: number, sourceColor: number): number {
  return Blend.harmonize(designColor, sourceColor)
}

export function blendCam(from: number, to: number, amount: number): number {
  return Blend.cam16Ucs(from, to, amount);
}

export function blendHue(from: number, to: number, amount: number): number {
  return Blend.hctHue(from, to, amount);
}
