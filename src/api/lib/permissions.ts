import { ApolloError, ForbiddenError } from 'apollo-server-errors'
import { shield, rule } from 'graphql-shield'

import type { Context } from '../context'
// import type { NexusGenFieldTypes } from '../types/nexus'

const authenticated = rule({ cache: 'contextual' })((_, __, { user }) => {
  return !!user
})

export const permissions = shield<any, Context>(
  {
    Query: {
      user: authenticated,
    },
    Mutation: {
      updateUser: authenticated,
    },
  },
  {
    debug: true,
    fallbackError(error) {
      if (error instanceof ApolloError) {
        return error
      }
      return new ForbiddenError('Not Authorized')
    },
  }
)
