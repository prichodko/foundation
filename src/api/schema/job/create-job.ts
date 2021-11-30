import { mutationField, inputObjectType } from 'nexus'

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
        t.string('feedback')
      },
    }),
  },

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, { input }, ctx) {
    const user = ctx.user!

    const job = await ctx.prisma.job.create({
      data: {
        position: input.position,
        role: input.role,
        description: input.description,
        applyUrl: input.applyUrl,
        remote: input.remote,
        type: input.type,
        tags: {
          connect: input.tags.map(tagId => ({ id: tagId })),
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
