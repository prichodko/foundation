import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UserJobFragment = {
  __typename?: 'Job'
  id: string
  createdAt: Date
  updatedAt: Date
  position: string
  role: Types.JobRole
  description: JsonObject
  applyUrl: string
  remote: boolean
  status: Types.JobStatus
  type: Types.JobType
  tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
}

export type UserQueryVariables = Types.Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    id: string
    name?: string | null | undefined
    email: string
    jobs: Array<{
      __typename?: 'Job'
      id: string
      createdAt: Date
      updatedAt: Date
      position: string
      role: Types.JobRole
      description: JsonObject
      applyUrl: string
      remote: boolean
      status: Types.JobStatus
      type: Types.JobType
      tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
    }>
    company?:
      | {
          __typename?: 'Company'
          id: string
          name: string
          description: string
          slug: string
          email: string
          website: string
          twitter?: string | null | undefined
        }
      | null
      | undefined
    likes: Array<{
      __typename?: 'Job'
      id: string
      createdAt: Date
      position: string
      role: Types.JobRole
      company: {
        __typename?: 'Company'
        id: string
        name: string
        slug: string
      }
      tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
    }>
    alerts: Array<{ __typename?: 'Alert'; id: string; filter: JsonObject }>
  }
}

export const UserJobFragmentDoc = /*#__PURE__*/ gql`
  fragment UserJob on Job {
    id
    createdAt
    updatedAt
    position
    role
    description
    applyUrl
    remote
    status
    type
    tags {
      id
      name
    }
  }
`
export const UserDocument = /*#__PURE__*/ gql`
  query User {
    user {
      id
      name
      email
      jobs {
        ...UserJob
      }
      company {
        id
        name
        description
        slug
        email
        website
        twitter
      }
      likes {
        id
        createdAt
        position
        role
        company {
          id
          name
          slug
        }
        tags {
          id
          name
        }
      }
      alerts {
        id
        filter
      }
    }
  }
  ${UserJobFragmentDoc}
`

export function useUserQuery(
  options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options })
}
