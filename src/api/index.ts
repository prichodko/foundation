import { ApolloServer } from 'apollo-server-micro'
import { applyMiddleware } from 'graphql-middleware'
import type { NextApiRequest } from 'next'

import type { Context } from './context'
import { permissions } from './lib/permissions'
import { prisma } from './lib/prisma'
import { schema } from './schema'

const context = async ({}: { req: NextApiRequest }): Promise<Context> => {
  const user = (await prisma.user.findUnique({
    where: {
      id: '',
    },
  }))!

  return { db: prisma, user }
}

export const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
  introspection: true,
})
