import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
import { UserJobFragmentDoc } from '../../../graphql/user'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateJobMutationVariables = Types.Exact<{
  input: Types.CreateJobInput
}>

export type CreateJobMutation = {
  __typename?: 'Mutation'
  createJob: {
    __typename?: 'Job'
    id: string
    createdAt: Date
    updatedAt: Date
    position: string
    role: Types.JobRole
    description: JsonObject
    applyUrl: string
    remote: boolean
    status: Types.JobStatus
    type: Types.JobType
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
  }
}

export const CreateJobDocument = /*#__PURE__*/ gql`
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      ...UserJob
    }
  }
  ${UserJobFragmentDoc}
`

export function useCreateJobMutation() {
  return Urql.useMutation<CreateJobMutation, CreateJobMutationVariables>(
    CreateJobDocument
  )
}
