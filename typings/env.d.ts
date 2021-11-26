/// <reference types="next/image" />
/// <reference types="next/link" />
/// <reference types="next/script" />

import type { Prisma } from '@prisma/client'

declare global {
  declare type JsonObject = Prisma.JsonObject
}
