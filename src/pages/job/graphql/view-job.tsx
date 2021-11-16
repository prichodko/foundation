import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ViewJobMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type ViewJobMutation = {
  __typename?: 'Mutation'
  viewJob: { __typename?: 'Job'; id: string; viewCount: number }
}

export const ViewJobDocument = /*#__PURE__*/ gql`
  mutation ViewJob($id: ID!) {
    viewJob(id: $id) {
      id
      viewCount
    }
  }
`

export function useViewJobMutation() {
  return Urql.useMutation<ViewJobMutation, ViewJobMutationVariables>(
    ViewJobDocument
  )
}
