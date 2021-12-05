import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpdateCompanyMutationVariables = Types.Exact<{
  input: Types.UpdateCompanyInput
}>

export type UpdateCompanyMutation = {
  __typename?: 'Mutation'
  updateCompany: {
    __typename?: 'Company'
    id: string
    name: string
    email: string
    description: string
    website: string
    twitter?: string | null | undefined
  }
}

export const UpdateCompanyDocument = /*#__PURE__*/ gql`
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      id
      name
      email
      description
      website
      twitter
    }
  }
`

export function useUpdateCompanyMutation() {
  return Urql.useMutation<
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables
  >(UpdateCompanyDocument)
}
