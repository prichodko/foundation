import type * as Types from '../../../types/graphql'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type JobsQueryVariables = Types.Exact<{
  input: Types.GetJobsInput
}>

export type JobsQuery = {
  __typename?: 'Query'
  jobs: Array<{
    __typename?: 'Job'
    id: string
    position: string
    liked: boolean
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
    company: { __typename?: 'Company'; id: string; name: string; slug: string }
  }>
}

export const JobsDocument = /*#__PURE__*/ gql`
  query Jobs($input: GetJobsInput!) {
    jobs(input: $input) {
      id
      position
      tags {
        id
        name
      }
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
