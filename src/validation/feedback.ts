import type { Describe } from 'superstruct'
import { object, string } from 'superstruct'

import type { NexusGenInputs } from '~/api/types/nexus'

import { email, maybe, required, enums } from './structs'

export const createFeedbackSchema: Describe<
  Required<NexusGenInputs['CreateFeedbackInput']>
> = object({
  message: required(string()),
  reaction: enums('FeedbackReaction'),
  email: maybe(email()),
})
