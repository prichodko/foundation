import type { User } from '@prisma/client'

import type { Auth } from './lib/auth'
import type { prisma } from './lib/prisma'

export type Context = {
  prisma: typeof prisma
  user: User | null
  auth: Auth
}
