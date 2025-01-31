import { useState } from 'nuxt/app'
import type { DynamicScheme } from '@material/material-color-utilities'

export const useDynamicScheme = () => useState<DynamicScheme>('dynamicScheme')
