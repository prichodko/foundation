import path from 'path'

import { makeSchema } from 'nexus'

import * as user from './user'

export const schema = makeSchema({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  types: [user],
  contextType: {
    module: path.join(process.cwd(), 'src/api/context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '.prisma/client',
        alias: 'prisma',
      },
    ],
  },
  outputs: {
    typegen: path.join(process.cwd(), 'src/api/types/nexus.ts'),
    schema: path.join(process.cwd(), 'src/api/schema.graphql'),
  },
  prettierConfig: path.join(process.cwd(), './.prettierrc'),
})
