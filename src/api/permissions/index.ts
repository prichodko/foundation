import { ApolloError, ForbiddenError } from 'apollo-server-errors'
import { rule, shield } from 'graphql-shield'

import type { Context } from '../context'
import type { NexusGenFieldTypes } from '../types/nexus'

const user = rule({ cache: 'contextual' })((_, __, { user }) => {
  return !!user
})

// const owner

export const permissions = shield<NexusGenFieldTypes, Context>(
  {
    Query: {
      user: user,
    },
    Mutation: {
      updateUser: user,
    },
  },
  {
    debug: true,
    fallbackError(error) {
      console.log('fallback', error instanceof ApolloError)

      // if (error instanceof ApolloError) {
      //   return error
      // }
      return new ForbiddenError('Not Authorized')
    },
  }
)
