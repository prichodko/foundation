import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CompanyBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['String']
}>

export type CompanyBySlugQuery = {
  __typename?: 'Query'
  companyBySlug: {
    __typename?: 'Company'
    id: string
    name: string
    slug: string
    twitter?: string | null | undefined
    description: string
    website: string
    viewCount: number
    subscribed: boolean
    jobs: Array<{
      __typename?: 'Job'
      id: string
      position: string
      description: JsonObject
      tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
    }>
  }
}

export const CompanyBySlugDocument = /*#__PURE__*/ gql`
  query CompanyBySlug($slug: String!) {
    companyBySlug(slug: $slug) {
      id
      name
      slug
      twitter
      description
      website
      viewCount
      subscribed
      jobs {
        id
        position
        description
        tags {
          id
          name
        }
      }
    }
  }
`

export function useCompanyBySlugQuery(
  options: Omit<Urql.UseQueryArgs<CompanyBySlugQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<CompanyBySlugQuery>({
    query: CompanyBySlugDocument,
    ...options,
  })
}
