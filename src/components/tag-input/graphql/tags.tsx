import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type TagsQueryVariables = Types.Exact<{
  input: Types.GetTagsInput
}>

export type TagsQuery = {
  __typename?: 'Query'
  tags: Array<{ __typename?: 'Tag'; id: string; name: string; count: number }>
}

export const TagsDocument = /*#__PURE__*/ gql`
  query Tags($input: GetTagsInput!) {
    tags(input: $input) {
      id
      name
      count
    }
  }
`

export function useTagsQuery(
  options: Omit<Urql.UseQueryArgs<TagsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<TagsQuery>({ query: TagsDocument, ...options })
}
