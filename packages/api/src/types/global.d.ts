import type { Prisma } from '@prisma/client'

declare global {
  declare type JsonObject = Prisma.JsonObject
}
