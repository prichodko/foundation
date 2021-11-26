import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SearchCitiesQueryVariables = Types.Exact<{
  country: Types.Scalars['String']
  name: Types.Scalars['String']
}>

export type SearchCitiesQuery = {
  __typename?: 'Query'
  searchCities: Array<{ __typename?: 'City'; id: string; name: string }>
}

export const SearchCitiesDocument = /*#__PURE__*/ gql`
  query SearchCities($country: String!, $name: String!) {
    searchCities(country: $country, name: $name) {
      id
      name
    }
  }
`

export function useSearchCitiesQuery(
  options: Omit<Urql.UseQueryArgs<SearchCitiesQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<SearchCitiesQuery>({
    query: SearchCitiesDocument,
    ...options,
  })
}
