import { object, string } from 'superstruct'

import type { Schema } from './structs'
import { required } from './structs'

const update: Schema<'UpdateUserInput'> = object({
  name: required(string()),
})

export const userSchema = {
  update,
}
