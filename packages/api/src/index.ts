import { ApolloServer } from 'apollo-server-micro'
import { applyMiddleware } from 'graphql-middleware'

import { prisma } from './lib/prisma'
import { permissions } from './permissions'
import { schema } from './schema'

import type { Context } from './context'
import type { NextApiRequest } from 'next'

interface Options {
  req: NextApiRequest
}

const context = async ({}: Options): Promise<Context> => {
  // const user = await prisma.user.findUnique({
  //   where: {
  //     // id: '',
  //   },
  // })

  return { db: prisma, user: null }
}

export const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
  introspection: true,
})

export { prisma }
