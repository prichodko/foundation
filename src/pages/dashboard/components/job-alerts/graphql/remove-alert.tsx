import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RemoveAlertMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type RemoveAlertMutation = {
  __typename?: 'Mutation'
  removeAlert: { __typename?: 'SuccessResult'; success: boolean }
}

export const RemoveAlertDocument = /*#__PURE__*/ gql`
  mutation RemoveAlert($id: ID!) {
    removeAlert(id: $id) {
      success
    }
  }
`

export function useRemoveAlertMutation() {
  return Urql.useMutation<RemoveAlertMutation, RemoveAlertMutationVariables>(
    RemoveAlertDocument
  )
}
