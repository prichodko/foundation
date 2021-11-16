import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateCheckoutSessionMutationVariables = Types.Exact<{
  input: Types.CreateCheckoutSessionInput
}>

export type CreateCheckoutSessionMutation = {
  __typename?: 'Mutation'
  createCheckoutSession: {
    __typename?: 'CreateCheckoutSessionResult'
    sessionUrl: string
  }
}

export const CreateCheckoutSessionDocument = /*#__PURE__*/ gql`
  mutation CreateCheckoutSession($input: CreateCheckoutSessionInput!) {
    createCheckoutSession(input: $input) {
      sessionUrl
    }
  }
`

export function useCreateCheckoutSessionMutation() {
  return Urql.useMutation<
    CreateCheckoutSessionMutation,
    CreateCheckoutSessionMutationVariables
  >(CreateCheckoutSessionDocument)
}
