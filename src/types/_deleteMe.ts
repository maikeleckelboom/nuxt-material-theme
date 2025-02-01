import type { BaseDynamicSchemeOptions } from '~/src/types/module'
import type { XOR } from '~/src/types/helpers'

/** Only allowed seedColor or primary, not both */
export type ExclusiveDynamicSchemeOptions = BaseDynamicSchemeOptions & XOR<
  { primary: number },
  { seedColor: number }
>;

/** Either seedColor or primary is required, both are allowed */
export type AtLeastOneColorSchemeOptions = Required<ExclusiveDynamicSchemeOptions> & XOR<
  { primary: number },
  { seedColor: number }
>;
