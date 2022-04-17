import { ForbiddenError } from 'apollo-server-errors'
import { fieldAuthorizePlugin, makeSchema } from 'nexus'
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
  plugins: [
    fieldAuthorizePlugin({
      formatError: () => {
        return new ForbiddenError('Not Authorized')
      },
    }),
  ],
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
    typegen: path.join(process.cwd(), '../api/src/types/nexus.d.ts'),
    schema: path.join(process.cwd(), '../api/schema.graphql'),
  },
  prettierConfig: path.join(process.cwd(), '../../.prettierrc'),
})
