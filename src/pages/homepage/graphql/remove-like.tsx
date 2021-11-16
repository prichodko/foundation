import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RemoveLikeMutationVariables = Types.Exact<{
  jobId: Types.Scalars['ID']
}>

export type RemoveLikeMutation = {
  __typename?: 'Mutation'
  removeLike: { __typename?: 'Job'; id: string; liked: boolean }
}

export const RemoveLikeDocument = /*#__PURE__*/ gql`
  mutation RemoveLike($jobId: ID!) {
    removeLike(id: $jobId) {
      id
      liked
    }
  }
`

export function useRemoveLikeMutation() {
  return Urql.useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(
    RemoveLikeDocument
  )
}
