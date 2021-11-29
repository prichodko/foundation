import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AddLikeMutationVariables = Types.Exact<{
  jobId: Types.Scalars['ID']
}>

export type AddLikeMutation = {
  __typename?: 'Mutation'
  addLike: { __typename?: 'Job'; id: string; liked: boolean }
}

export const AddLikeDocument = /*#__PURE__*/ gql`
  mutation AddLike($jobId: ID!) {
    addLike(id: $jobId) {
      id
      liked
    }
  }
`

export function useAddLikeMutation() {
  return Urql.useMutation<AddLikeMutation, AddLikeMutationVariables>(
    AddLikeDocument
  )
}
