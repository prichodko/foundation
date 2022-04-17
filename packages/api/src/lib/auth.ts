// import { AuthenticationError } from 'apollo-server-errors'

// import { prisma } from './prisma'

import type { Context } from '../context'

export type Auth = {
  user: boolean
}

export const createAuth = (user: Context['user']): Auth => {
  return {
    user: !!user,
    // owner: async (id: string) => {
    //   if (!user) {
    //     return new AuthenticationError('Unauthenticated')
    //   }

    //   const item = await prisma.items.findFirst({
    //     where: {
    //       id,
    //       userId: user.id,
    //     },
    //   })

    //   return !!item
    // },
  }
}
