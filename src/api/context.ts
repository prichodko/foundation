import type { User } from '@prisma/client'

import type { prisma } from './lib/prisma'

export type Context = {
  db: typeof prisma
  user: User
}
