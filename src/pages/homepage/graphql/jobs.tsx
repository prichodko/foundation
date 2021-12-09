import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type JobsQueryVariables = Types.Exact<{
  filter: Types.JobsFilter
  first: Types.Scalars['Int']
  after?: Types.Maybe<Types.Scalars['String']>
}>

export type JobsQuery = {
  __typename?: 'Query'
  jobs: {
    __typename?: 'JobConnection'
    edges: Array<{
      __typename?: 'JobEdge'
      cursor: string
      node: {
        __typename?: 'Job'
        id: string
        createdAt: Date
        position: string
        role: Types.JobRole
        liked: boolean
        tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
        company: {
          __typename?: 'Company'
          id: string
          name: string
          slug: string
        }
      }
    }>
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor?: string | null | undefined
      endCursor?: string | null | undefined
    }
  }
}

export const JobsDocument = /*#__PURE__*/ gql`
  query Jobs($filter: JobsFilter!, $first: Int!, $after: String) {
    jobs(filter: $filter, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          createdAt
          position
          tags {
            id
            name
          }
          role
          liked
          company {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export function useJobsQuery(
  options: Omit<Urql.UseQueryArgs<JobsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<JobsQuery>({ query: JobsDocument, ...options })
}
