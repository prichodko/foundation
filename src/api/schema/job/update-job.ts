import { mutationField, inputObjectType } from 'nexus'

export const UpdateJob = mutationField('updateJob', {
  type: 'Job',

  args: {
    input: inputObjectType({
      name: 'UpdateJobInput',
      definition(t) {
        t.id('id')
        t.string('position')
        t.field('role', { type: 'JobRole' })
        t.json('description')
        t.string('applyUrl')
        t.boolean('remote')
        t.list.id('tags')
      },
    }),
  },

  authorize: (_parent, args, ctx) => ctx.auth.owner.job(args.input.id),

  async resolve(_root, { input }, ctx) {
    const job = await ctx.prisma.job.update({
      where: {
        id: input.id,
      },
      data: {
        position: input.position,
        role: input.role,
        description: input.description,
        applyUrl: input.applyUrl,
        remote: input.remote,
        tags: {
          set: input.tags.map(tagId => ({ id: tagId })),
        },
      },
    })

    return job
  },
})
