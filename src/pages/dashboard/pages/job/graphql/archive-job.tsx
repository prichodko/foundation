import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ArchiveJobMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type ArchiveJobMutation = {
  __typename?: 'Mutation'
  archiveJob: { __typename?: 'Job'; id: string; status: Types.JobStatus }
}

export const ArchiveJobDocument = /*#__PURE__*/ gql`
  mutation ArchiveJob($id: ID!) {
    archiveJob(id: $id) {
      id
      status
    }
  }
`

export function useArchiveJobMutation() {
  return Urql.useMutation<ArchiveJobMutation, ArchiveJobMutationVariables>(
    ArchiveJobDocument
  )
}
