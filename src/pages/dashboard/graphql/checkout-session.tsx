import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CheckoutSessionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type CheckoutSessionQuery = {
  __typename?: 'Query'
  checkoutSession: {
    __typename?: 'CheckoutSessionResult'
    id: string
    amount: number
  }
}

export const CheckoutSessionDocument = /*#__PURE__*/ gql`
  query CheckoutSession($id: ID!) {
    checkoutSession(id: $id) {
      id
      amount
    }
  }
`

export function useCheckoutSessionQuery(
  options: Omit<Urql.UseQueryArgs<CheckoutSessionQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<CheckoutSessionQuery>({
    query: CheckoutSessionDocument,
    ...options,
  })
}
