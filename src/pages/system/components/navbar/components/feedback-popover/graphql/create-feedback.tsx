import { gql } from 'urql'
import * as Urql from 'urql'

import type * as Types from '../../../../../../../types/graphql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateFeedbackInput
}>

export type CreateFeedbackMutation = {
  readonly __typename?: 'Mutation'
  readonly createFeedback: {
    readonly __typename?: 'SuccessResult'
    readonly success: boolean
  }
}

export const CreateFeedbackDocument = /*#__PURE__*/ gql`
  mutation CreateFeedback($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      success
    }
  }
`

export function useCreateFeedbackMutation() {
  return Urql.useMutation<
    CreateFeedbackMutation,
    CreateFeedbackMutationVariables
  >(CreateFeedbackDocument)
}
