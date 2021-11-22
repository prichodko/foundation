import path from 'path'

import { ForbiddenError } from 'apollo-server-core'
import { GraphQLDateTime } from 'graphql-scalars'
import { decorateType, makeSchema, fieldAuthorizePlugin } from 'nexus'

import * as checkout from './checkout'
import * as city from './city'
import * as company from './company'
import * as job from './job'
import * as objects from './objects'
import * as tag from './tag'
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
  types: [DateTime, objects, user, job, company, checkout, tag, city],
  contextType: {
    module: path.join(process.cwd(), 'src/api/context.ts'),
    export: 'Context',
  },
  plugins: [
    fieldAuthorizePlugin({
      formatError: () => {
        return new ForbiddenError('Not Authorized')
      },
    }),
  ],
  sourceTypes: {
    modules: [
      {
        module: '.prisma/client',
        alias: 'prisma',
      },
    ],
  },
  shouldExitAfterGenerateArtifacts: Boolean(
    process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION
  ),
  outputs: {
    typegen: path.join(process.cwd(), 'src/api/types/nexus.ts'),
    schema: path.join(process.cwd(), 'src/api/schema.graphql'),
  },
  prettierConfig: path.join(process.cwd(), './.prettierrc'),
})
