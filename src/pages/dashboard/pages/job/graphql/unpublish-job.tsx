import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UnpublishJobMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type UnpublishJobMutation = {
  __typename?: 'Mutation'
  unpublishJob: { __typename?: 'Job'; id: string; status: Types.JobStatus }
}

export const UnpublishJobDocument = /*#__PURE__*/ gql`
  mutation UnpublishJob($id: ID!) {
    unpublishJob(id: $id) {
      id
      status
    }
  }
`

export function useUnpublishJobMutation() {
  return Urql.useMutation<UnpublishJobMutation, UnpublishJobMutationVariables>(
    UnpublishJobDocument
  )
}
