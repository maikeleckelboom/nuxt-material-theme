import { DislikeAnalyzer, Hct } from '@material/material-color-utilities'

export function isDisliked(argbColor: number) {
  const hct = Hct.fromInt(argbColor)
  return DislikeAnalyzer.isDisliked(hct)
}

export function fixIfDisliked(argbColor: number) {
  const hct = Hct.fromInt(argbColor)
  return DislikeAnalyzer.fixIfDisliked(hct).toInt()
}
