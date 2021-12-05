import { ApolloServer, UserInputError } from 'apollo-server-micro'
import type { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { StructError } from 'superstruct'

import { env } from './config/env'
import type { Context } from './context'
import { createAuth } from './lib/auth'
import { prisma } from './lib/prisma'
import { schema } from './schema'

interface Options {
  req: NextApiRequest
}

const getUser = async (req: NextApiRequest): Promise<Context['user']> => {
  const session = await getToken({ req, secret: env.auth.secret })

  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.email!,
    },
  })

  return user
}

const context = async ({ req }: Options): Promise<Context> => {
  const user = await getUser(req)

  const auth = createAuth(user)

  return { prisma, user, auth }
}

export const server = new ApolloServer({
  schema,
  context,
  introspection: true,
  formatError: error => {
    if (error instanceof StructError) {
      return new UserInputError(error.message, {
        // path: error.path.join('.'),
        // message: error.failures()[0].message,
      })
    }
    return error
  },
})
