import { object, string } from 'superstruct'

import { required } from './structs'

import type { Schema } from './structs'

const update: Schema<'UpdateUserInput'> = object({
  name: required(string()),
})

export const userSchema = {
  update,
}
