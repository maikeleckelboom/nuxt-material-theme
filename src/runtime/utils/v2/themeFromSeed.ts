import { generateTheme, type MaterialTheme } from './themeFromSeedColor'

export async function themeFromSeed(
  seed: string | number | ImageBitmapSource
): Promise<MaterialTheme> {
  // todo: if seed is string, check if it is an url and load image
  //       if seed is ImageBitmapSource, extract color from image
  return generateTheme(Number(seed))
}
