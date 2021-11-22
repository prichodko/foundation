import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest } from 'next'

import type { Context } from './context'
import { createAuth } from './lib/auth'
import { prisma } from './lib/prisma'
import { schema } from './schema'

interface Options {
  req: NextApiRequest
}

const context = async ({}: Options): Promise<Context> => {
  const user = await prisma.user.findUnique({
    where: {
      id: 'ckw2e39m2195108mfox34yhz1',
    },
    rejectOnNotFound: true,
  })

  const auth = createAuth(user!)

  return { prisma, user, auth }
}

export const server = new ApolloServer({
  schema,
  context,
  introspection: true,
})
