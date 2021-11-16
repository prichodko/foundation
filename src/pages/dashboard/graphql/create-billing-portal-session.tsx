import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateBillingPortalSessionMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type CreateBillingPortalSessionMutation = {
  __typename?: 'Mutation'
  createBillingPortalSession: {
    __typename?: 'CreateBillingPortalSessionResult'
    url: string
  }
}

export const CreateBillingPortalSessionDocument = /*#__PURE__*/ gql`
  mutation CreateBillingPortalSession {
    createBillingPortalSession {
      url
    }
  }
`

export function useCreateBillingPortalSessionMutation() {
  return Urql.useMutation<
    CreateBillingPortalSessionMutation,
    CreateBillingPortalSessionMutationVariables
  >(CreateBillingPortalSessionDocument)
}
