import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SearchCompaniesQueryVariables = Types.Exact<{
  name: Types.Scalars['String']
  not: Array<Types.Scalars['String']>
}>

export type SearchCompaniesQuery = {
  __typename?: 'Query'
  searchCompanies: Array<{
    __typename?: 'CompanySearch'
    id: string
    name: string
  }>
}

export type SearchTagsQueryVariables = Types.Exact<{
  name: Types.Scalars['String']
  not: Array<Types.Scalars['String']>
}>

export type SearchTagsQuery = {
  __typename?: 'Query'
  searchTags: Array<{
    __typename?: 'TagSearch'
    id: string
    name: string
    count: number
  }>
}

export const SearchCompaniesDocument = /*#__PURE__*/ gql`
  query SearchCompanies($name: String!, $not: [String!]!) {
    searchCompanies(name: $name, not: $not) {
      id
      name
    }
  }
`

export function useSearchCompaniesQuery(
  options: Omit<Urql.UseQueryArgs<SearchCompaniesQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<SearchCompaniesQuery>({
    query: SearchCompaniesDocument,
    ...options,
  })
}
export const SearchTagsDocument = /*#__PURE__*/ gql`
  query SearchTags($name: String!, $not: [String!]!) {
    searchTags(name: $name, not: $not) {
      id
      name
      count
    }
  }
`

export function useSearchTagsQuery(
  options: Omit<Urql.UseQueryArgs<SearchTagsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<SearchTagsQuery>({
    query: SearchTagsDocument,
    ...options,
  })
}
