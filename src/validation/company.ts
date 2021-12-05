import { string, object } from 'superstruct'

import type { Schema } from './structs'
import { twitter, maybe, email, required, url } from './structs'

const update: Schema<'UpdateCompanyInput'> = object({
  id: string(),
  email: required(email()),
  description: required(string()),
  name: required(string()),
  website: required(url()),
  twitter: maybe(twitter(string())),
})

export const companySchema = {
  update,
}
