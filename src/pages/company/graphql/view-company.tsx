import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ViewCompanyMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type ViewCompanyMutation = {
  __typename?: 'Mutation'
  viewCompany: { __typename?: 'Company'; id: string; viewCount: number }
}

export const ViewCompanyDocument = /*#__PURE__*/ gql`
  mutation ViewCompany($id: ID!) {
    viewCompany(id: $id) {
      id
      viewCount
    }
  }
`

export function useViewCompanyMutation() {
  return Urql.useMutation<ViewCompanyMutation, ViewCompanyMutationVariables>(
    ViewCompanyDocument
  )
}
