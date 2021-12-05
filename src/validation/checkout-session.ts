import { min, number, object, string } from 'superstruct'

import type { Schema } from './structs'
import { required } from './structs'

export const createCheckoutSessionSchema: Schema<'CreateCheckoutSessionInput'> =
  object({
    name: required(string()),
    price: min(number(), 1),
  })
