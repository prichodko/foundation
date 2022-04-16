import { GraphQLDateTime } from 'graphql-scalars'
import { decorateType, makeSchema } from 'nexus'
import path from 'path'

import * as checkout from './checkout'
import * as objects from './objects'
import * as user from './user'

const DateTime = decorateType(GraphQLDateTime, {
  sourceType: 'Date',
  asNexusMethod: 'date',
})

export const schema = makeSchema({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  types: [DateTime, objects, user, checkout],
  contextType: {
    module: path.join(process.cwd(), '../api/src/context.ts'),
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
  shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_REFLECTION),
  outputs: {
    typegen: path.join(process.cwd(), '../api/types/nexus.ts'),
    schema: path.join(process.cwd(), '../api/schema.graphql'),
  },
  prettierConfig: path.join(process.cwd(), '../../.prettierrc'),
})
