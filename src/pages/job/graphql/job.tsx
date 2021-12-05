import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type JobQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type JobQuery = {
  __typename?: 'Query'
  job: {
    __typename?: 'Job'
    id: string
    position: string
    role: Types.JobRole
    description: JsonObject
    applyUrl: string
    viewCount: number
    liked: boolean
    type: Types.JobType
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
    company: {
      __typename?: 'Company'
      id: string
      name: string
      slug: string
      email: string
      website: string
      twitter?: string | null | undefined
    }
  }
}

export const JobDocument = /*#__PURE__*/ gql`
  query Job($id: ID!) {
    job(id: $id) {
      id
      position
      role
      description
      applyUrl
      viewCount
      liked
      type
      tags {
        id
        name
      }
      company {
        id
        name
        slug
        email
        website
        twitter
      }
    }
  }
`

export function useJobQuery(
  options: Omit<Urql.UseQueryArgs<JobQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<JobQuery>({ query: JobDocument, ...options })
}
