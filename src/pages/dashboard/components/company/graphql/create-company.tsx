import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateCompanyMutationVariables = Types.Exact<{
  input: Types.CreateCompanyInput
}>

export type CreateCompanyMutation = {
  __typename?: 'Mutation'
  createCompany: {
    __typename?: 'Company'
    id: string
    name: string
    email: string
    slug: string
    description: string
  }
}

export const CreateCompanyDocument = /*#__PURE__*/ gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      name
      email
      slug
      description
    }
  }
`

export function useCreateCompanyMutation() {
  return Urql.useMutation<
    CreateCompanyMutation,
    CreateCompanyMutationVariables
  >(CreateCompanyDocument)
}
