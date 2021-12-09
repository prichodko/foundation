
import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateUploadUrlMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type CreateUploadUrlMutation = {
  __typename?: 'Mutation'
  createUploadUrl: { __typename?: 'CreateUploadUrlResult'; uploadUrl: string }
}

export const CreateUploadUrlDocument = /*#__PURE__*/ gql`
  mutation CreateUploadUrl {
    createUploadUrl {
      uploadUrl
    }
  }
`

export function useCreateUploadUrlMutation() {
  return Urql.useMutation<
    CreateUploadUrlMutation,
    CreateUploadUrlMutationVariables
  >(CreateUploadUrlDocument)
}
