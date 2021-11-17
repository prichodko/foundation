import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
import { UserJobFragmentDoc } from '../../../graphql/user'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpdateJobMutationVariables = Types.Exact<{
  input: Types.UpdateJobInput
}>

export type UpdateJobMutation = {
  __typename?: 'Mutation'
  updateJob: {
    __typename?: 'Job'
    id: string
    createdAt: Date
    updatedAt: Date
    position: string
    role: Types.JobRole
    description: string
    applyUrl: string
    remote: boolean
    status: Types.JobStatus
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
  }
}

export const UpdateJobDocument = /*#__PURE__*/ gql`
  mutation UpdateJob($input: UpdateJobInput!) {
    updateJob(input: $input) {
      ...UserJob
    }
  }
  ${UserJobFragmentDoc}
`

export function useUpdateJobMutation() {
  return Urql.useMutation<UpdateJobMutation, UpdateJobMutationVariables>(
    UpdateJobDocument
  )
}
