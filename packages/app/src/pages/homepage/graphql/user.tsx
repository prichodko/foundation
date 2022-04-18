import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql.d'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UserQueryVariables = Types.Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user: { __typename?: 'User'; id: string }
}

export const UserDocument = /*#__PURE__*/ gql`
  query User {
    user {
      id
    }
  }
`

export function useUserQuery(
  options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options })
}
