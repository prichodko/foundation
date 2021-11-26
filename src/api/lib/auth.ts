import type { Context } from '../context'

import { prisma } from './prisma'

export type Auth = {
  user: boolean
  owner: {
    job: (jobId: string) => Promise<boolean> | boolean
    company: (companyId: string) => Promise<boolean> | boolean
  }
}

export const createAuth = (user: Context['user']): Auth => {
  return {
    user: !!user,
    owner: {
      job: async (jobId: string) => {
        if (!user) {
          return false
        }

        const job = await prisma.job.findFirst({
          where: {
            id: jobId,
            user: { id: user.id },
          },
        })
        return !!job
      },
      company: async (companyId: string) => {
        if (!user) {
          return false
        }

        const company = await prisma.company.findFirst({
          where: {
            id: companyId,
            user: { id: user.id },
          },
        })
        return !!company
      },
    },
  }
}
