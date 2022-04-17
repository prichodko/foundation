import type { Auth } from './lib/auth'
import type { prisma } from './lib/prisma'
import type { User } from '@prisma/client'

export type Context = {
  db: typeof prisma
  user: User | null
  auth: Auth
}
