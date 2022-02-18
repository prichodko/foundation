import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// rejectOnNotFound: true,
// log: ['query'],
export const prisma: PrismaClient = global.prisma ?? new PrismaClient({})

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
