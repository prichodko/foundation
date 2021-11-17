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
  description: string
  applyUrl: string
  remote: boolean
  status: Types.JobStatus
  tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
}

export type UserQueryVariables = Types.Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    id: string
    name?: string | null | undefined
    email?: string | null | undefined
    jobs: Array<{
      __typename?: 'Job'
      id: string
      createdAt: Date
      updatedAt: Date
      position: string
      role: Types.JobRole
      description: string
      applyUrl: string
      remote: boolean
      status: Types.JobStatus
      tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
    }>
    company?:
      | {
          __typename?: 'Company'
          id: string
          name: string
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
      position: string
      company: {
        __typename?: 'Company'
        id: string
        name: string
        slug: string
      }
    }>
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
        slug
        email
        website
        twitter
      }
      likes {
        id
        position
        company {
          id
          name
          slug
        }
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
