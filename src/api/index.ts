import { ApolloServer } from 'apollo-server-micro'
import { applyMiddleware } from 'graphql-middleware'
import type { NextApiRequest } from 'next'

import type { Context } from './context'
import { prisma } from './lib/prisma'
import { permissions } from './permissions'
import { schema } from './schema'

interface Options {
  req: NextApiRequest
}

const context = async ({}: Options): Promise<Context> => {
  const user = await prisma.user.findUnique({
    where: {
      id: 'ckvqsw77v0033itoaonqj4b35',
    },
  })

  return { db: prisma, user: user! }
}

export const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
  introspection: true,
})
