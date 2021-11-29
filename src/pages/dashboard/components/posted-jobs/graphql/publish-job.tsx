import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PublishJobMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type PublishJobMutation = {
  __typename?: 'Mutation'
  publishJob: { __typename?: 'Job'; id: string; status: Types.JobStatus }
}

export const PublishJobDocument = /*#__PURE__*/ gql`
  mutation PublishJob($id: ID!) {
    publishJob(id: $id) {
      id
      status
    }
  }
`

export function usePublishJobMutation() {
  return Urql.useMutation<PublishJobMutation, PublishJobMutationVariables>(
    PublishJobDocument
  )
}
