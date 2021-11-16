import type * as Types from '../../../types/graphql'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CitiesQueryVariables = Types.Exact<{
  input: Types.GetCitiesInput
}>

export type CitiesQuery = {
  __typename?: 'Query'
  cities: Array<{ __typename?: 'City'; value: string; label: string }>
}

export const CitiesDocument = /*#__PURE__*/ gql`
  query Cities($input: GetCitiesInput!) {
    cities(input: $input) {
      value
      label
    }
  }
`

export function useCitiesQuery(
  options: Omit<Urql.UseQueryArgs<CitiesQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<CitiesQuery>({ query: CitiesDocument, ...options })
}
