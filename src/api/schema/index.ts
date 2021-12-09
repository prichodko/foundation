import path from 'path'

import { ForbiddenError } from 'apollo-server-core'
import { makeSchema, fieldAuthorizePlugin } from 'nexus'

import * as alert from './alert'
import * as checkout from './checkout'
import * as city from './city'
import * as company from './company'
import * as feedback from './feedback'
import * as imageUpload from './image-upload'
import * as job from './job'
import * as scalars from './scalars'
import * as tag from './tag'
import * as types from './types'
import * as user from './user'

export const schema = makeSchema({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  types: [
    scalars,
    types,
    user,
    job,
    company,
    checkout,
    tag,
    city,
    alert,
    feedback,
    imageUpload,
  ],
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
  shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_REFLECTION),
  outputs: {
    typegen: path.join(process.cwd(), 'src/api/types/nexus.ts'),
    schema: path.join(process.cwd(), 'src/api/schema.graphql'),
  },
  prettierConfig: path.join(process.cwd(), './.prettierrc'),
})
