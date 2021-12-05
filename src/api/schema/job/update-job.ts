import { mutationField, inputObjectType } from 'nexus'

import { jobSchema } from '~/validation/job'

export const UpdateJob = mutationField('updateJob', {
  type: 'Job',

  args: {
    input: inputObjectType({
      name: 'UpdateJobInput',
      definition(t) {
        t.id('id')
        t.string('position')
        t.field('role', { type: 'JobRole' })
        t.field('type', { type: 'JobType' })
        t.json('description')
        t.string('applyUrl')
        t.boolean('remote')
        t.list.id('tags')
      },
    }),
  },

  authorize: (_parent, args, ctx) => ctx.auth.owner.job(args.input.id),

  async resolve(_root, { input }, ctx) {
    const data = jobSchema.update.create(input)

    const job = await ctx.prisma.job.update({
      where: {
        id: input.id,
      },
      data: {
        position: data.position,
        role: data.role,
        description: data.description,
        applyUrl: data.applyUrl,
        remote: data.remote,
        type: data.type,
        tags: {
          set: data.tags.map(tagId => ({ id: tagId })),
        },
      },
    })

    return job
  },
})
