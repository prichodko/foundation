import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type JobsQueryVariables = Types.Exact<{
  filter: Types.JobsFilter
}>

export type JobsQuery = {
  __typename?: 'Query'
  jobs: Array<{
    __typename?: 'Job'
    id: string
    createdAt: Date
    position: string
    role: Types.JobRole
    liked: boolean
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
    company: { __typename?: 'Company'; id: string; name: string; slug: string }
  }>
}

export const JobsDocument = /*#__PURE__*/ gql`
  query Jobs($filter: JobsFilter!) {
    jobs(filter: $filter) {
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
`

export function useJobsQuery(
  options: Omit<Urql.UseQueryArgs<JobsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<JobsQuery>({ query: JobsDocument, ...options })
}
