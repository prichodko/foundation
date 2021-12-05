import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateCompanyAlertMutationVariables = Types.Exact<{
  companyId: Types.Scalars['String']
}>

export type CreateCompanyAlertMutation = {
  __typename?: 'Mutation'
  createCompanyAlert: { __typename?: 'Alert'; id: string }
}

export const CreateCompanyAlertDocument = /*#__PURE__*/ gql`
  mutation CreateCompanyAlert($companyId: String!) {
    createCompanyAlert(companyId: $companyId) {
      id
    }
  }
`

export function useCreateCompanyAlertMutation() {
  return Urql.useMutation<
    CreateCompanyAlertMutation,
    CreateCompanyAlertMutationVariables
  >(CreateCompanyAlertDocument)
}
