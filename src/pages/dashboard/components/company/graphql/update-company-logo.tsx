
import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpdateCompanyLogoMutationVariables = Types.Exact<{
  input: Types.UpdateCompanyLogoInput
}>

export type UpdateCompanyLogoMutation = {
  __typename?: 'Mutation'
  updateCompanyLogo: { __typename?: 'Company'; id: string; logoUrl: string }
}

export const UpdateCompanyLogoDocument = /*#__PURE__*/ gql`
  mutation UpdateCompanyLogo($input: UpdateCompanyLogoInput!) {
    updateCompanyLogo(input: $input) {
      id
      logoUrl
    }
  }
`

export function useUpdateCompanyLogoMutation() {
  return Urql.useMutation<
    UpdateCompanyLogoMutation,
    UpdateCompanyLogoMutationVariables
  >(UpdateCompanyLogoDocument)
}
