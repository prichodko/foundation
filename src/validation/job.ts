import { array, boolean, object, string } from 'superstruct'

import type { Schema } from './structs'
import { maybe, required, url, json, enums } from './structs'

const create: Schema<'CreateJobInput'> = object({
  applyUrl: required(url()),
  description: json(),
  position: required(string()),
  remote: boolean(),
  role: enums('JobRole'),
  tags: array(string()),
  feedback: maybe(string()),
  type: enums('JobType'),
})

const update: Schema<'UpdateJobInput'> = object({
  id: string(),
  applyUrl: required(url()),
  description: json(),
  position: required(string()),
  remote: boolean(),
  role: enums('JobRole'),
  tags: array(string()),
  type: enums('JobType'),
})

export const jobSchema = {
  create,
  update,
}
