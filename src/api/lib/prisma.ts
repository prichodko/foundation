import { PrismaClient } from '@prisma/client'

export const prisma: PrismaClient =
  (global as any).prisma ?? new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  global.prisma = prisma
}
