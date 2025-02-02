import { camelCase, dotCase, kebabCase } from 'change-case'

export const CASE_TRANSFORMER_REGISTRY = {
  kebab: kebabCase,
  camel: camelCase,
  dot: dotCase
} as const

export type CaseFormat = keyof TransformerRegistry;

type TransformerRegistry = typeof CASE_TRANSFORMER_REGISTRY;

type TransformerOptions<T> = T extends (input: string, options?: infer O) => string
  ? O
  : never;

type CaseOptionsMap = {
  [K in keyof TransformerRegistry]: TransformerOptions<TransformerRegistry[K]>;
};

export type CaseOptions<F extends keyof TransformerRegistry> = CaseOptionsMap[F];

export function changeCase<F extends CaseFormat>(
  input: string,
  caseFormat?: F,
  caseOptions?: CaseOptions<F>
): string {
  const transformer = CASE_TRANSFORMER_REGISTRY[caseFormat || 'camel']
  return transformer(input, caseOptions)
}

export function listCaseFormats(): CaseFormat[] {
  return Object.keys(CASE_TRANSFORMER_REGISTRY) as CaseFormat[]
}
