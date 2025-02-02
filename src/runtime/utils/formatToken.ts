import { changeCase, type CaseFormat, type CaseOptions} from './changeCase'

export interface FormatTokenOptions<F extends CaseFormat = CaseFormat> {
  prefix?: string
  suffix?: string
  caseFormat?: F
  caseOptions?: CaseOptions<F>
}

export function formatToken<F extends CaseFormat>(
  token: string,
  options: FormatTokenOptions<F> = {}
): string {
  const { prefix, suffix, caseFormat, caseOptions } = options
  const combinedInput = [prefix, token, suffix].filter(Boolean).join('_')
  return changeCase(combinedInput, caseFormat, caseOptions)
}
