import { AuthenticationError } from 'apollo-server-errors'

import type { Context } from '../context'

import { prisma } from './prisma'

export type Auth = {
  user: boolean
  owner: {
    job: (jobId: string) => Promise<boolean | Error> | boolean
    company: (companyId: string) => Promise<boolean | Error> | boolean
    alert: (alertId: string) => Promise<boolean | Error> | boolean
  }
}

export const createAuth = (user: Context['user']): Auth => {
  return {
    user: !!user,
    owner: {
      job: async (jobId: string) => {
        if (!user) {
          return new AuthenticationError('Unauthenticated')
        }

        const job = await prisma.job.findFirst({
          where: {
            id: jobId,
            userId: user.id,
          },
        })

        return !!job
      },
      company: async (companyId: string) => {
        if (!user) {
          return new AuthenticationError('Unauthenticated')
        }

        const company = await prisma.company.findFirst({
          where: {
            id: companyId,
            userId: user.id,
          },
        })

        return !!company
      },
      alert: async (alertId: string) => {
        if (!user) {
          return new AuthenticationError('Unauthenticated')
        }

        const alert = await prisma.alert.findFirst({
          where: {
            id: alertId,
            userId: user.id,
          },
        })

        return !!alert
      },
    },
  }
}
