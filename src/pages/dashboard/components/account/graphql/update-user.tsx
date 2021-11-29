import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename?: 'User'
    id: string
    name?: string | null | undefined
    email: string
  }
}

export const UpdateUserDocument = /*#__PURE__*/ gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
    }
  }
`

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument
  )
}
