import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateAlertMutationVariables = Types.Exact<{
  input: Types.CreateAlertInput
}>

export type CreateAlertMutation = {
  __typename?: 'Mutation'
  createAlert: { __typename?: 'Alert'; id: string; filter: JsonObject }
}

export const CreateAlertDocument = /*#__PURE__*/ gql`
  mutation CreateAlert($input: CreateAlertInput!) {
    createAlert(input: $input) {
      id
      filter
    }
  }
`

export function useCreateAlertMutation() {
  return Urql.useMutation<CreateAlertMutation, CreateAlertMutationVariables>(
    CreateAlertDocument
  )
}
