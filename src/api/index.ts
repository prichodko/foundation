import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'

import type { Context } from './context'
import { createAuth } from './lib/auth'
import { prisma } from './lib/prisma'
import { schema } from './schema'

interface Options {
  req: NextApiRequest
}

const getUser = async (req: NextApiRequest): Promise<Context['user']> => {
  const session = await getToken({ req, secret: process.env.SECRET! })

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
})
