import { makeSchema } from 'nexus'
import path from 'path'

import * as checkout from './checkout'
import * as objects from './objects'
import * as scalars from './scalars'
import * as user from './user'

export const schema = makeSchema({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  types: [scalars, objects, user, checkout],
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
    typegen: path.join(process.cwd(), '../api/src/typings/nexus.d.ts'),
    schema: path.join(process.cwd(), '../api/schema.graphql'),
  },
  prettierConfig: path.join(process.cwd(), '../../.prettierrc'),
})
