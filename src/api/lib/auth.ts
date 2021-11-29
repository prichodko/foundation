import type { Context } from '../context'

import { prisma } from './prisma'

export type Auth = {
  user: boolean
  owner: {
    job: (jobId: string) => Promise<boolean> | boolean
    company: (companyId: string) => Promise<boolean> | boolean
    alert: (alertId: string) => Promise<boolean> | boolean
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
            userId: user.id,
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
            userId: user.id,
          },
        })

        return !!company
      },
      alert: async (alertId: string) => {
        if (!user) {
          return false
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
