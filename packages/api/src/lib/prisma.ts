import { PrismaClient } from '@prisma/client'

// rejectOnNotFound: true,
// log: ['query'],
// prettier-ignore
export const prisma: PrismaClient = (global as any).prisma ?? new PrismaClient({})

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  global.prisma = prisma
}
