import type * as Types from '../../../types/graphql'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CompaniesQueryVariables = Types.Exact<{ [key: string]: never }>

export type CompaniesQuery = {
  __typename?: 'Query'
  companies: Array<{
    __typename?: 'Company'
    id: string
    name: string
    slug: string
    description: string
    website: string
    twitter?: string | null | undefined
  }>
}

export const CompaniesDocument = /*#__PURE__*/ gql`
  query Companies {
    companies {
      id
      name
      slug
      description
      website
      twitter
    }
  }
`

export function useCompaniesQuery(
  options: Omit<Urql.UseQueryArgs<CompaniesQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<CompaniesQuery>({ query: CompaniesDocument, ...options })
}
