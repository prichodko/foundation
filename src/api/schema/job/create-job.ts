import { mutationField, inputObjectType } from 'nexus'

import { jobSchema } from '~/validation/job'

export const CreateJob = mutationField('createJob', {
  type: 'Job',

  args: {
    input: inputObjectType({
      name: 'CreateJobInput',
      definition(t) {
        t.string('position')
        t.field('role', { type: 'JobRole' })
        t.field('type', { type: 'JobType' })
        t.json('description')
        t.string('applyUrl')
        t.boolean('remote')
        t.list.id('tags')
        t.nullable.string('feedback')
      },
    }),
  },

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, { input }, ctx) {
    const data = jobSchema.create.create(input)

    const user = ctx.user!

    const job = await ctx.prisma.job.create({
      data: {
        position: data.position,
        role: data.role,
        description: data.description,
        applyUrl: data.applyUrl,
        remote: data.remote,
        type: data.type,
        tags: {
          connect: data.tags.map(tagId => ({ id: tagId })),
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return job
  },
})
