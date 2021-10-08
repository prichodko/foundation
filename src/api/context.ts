import type { PrismaClient, User } from '@prisma/client'

export type Context = {
  db: PrismaClient
  user: User
}
