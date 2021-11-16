import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateTagMutationVariables = Types.Exact<{
  input: Types.CreateTagInput
}>

export type CreateTagMutation = {
  __typename?: 'Mutation'
  createTag: { __typename?: 'Tag'; id: string; name: string }
}

export const CreateTagDocument = /*#__PURE__*/ gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
    }
  }
`

export function useCreateTagMutation() {
  return Urql.useMutation<CreateTagMutation, CreateTagMutationVariables>(
    CreateTagDocument
  )
}
