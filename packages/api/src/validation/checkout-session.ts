import { min, number, object, string } from 'superstruct'

import { required } from './structs'

import type { Schema } from './structs'

export const createCheckoutSessionSchema: Schema<'CreateCheckoutSessionInput'> =
  object({
    name: required(string()),
    price: min(number(), 1),
  })
