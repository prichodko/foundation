import { mutationField, inputObjectType } from 'nexus'

export const CreateJob = mutationField('createJob', {
  type: 'Job',
  args: {
    input: inputObjectType({
      name: 'CreateJobInput',
      definition(t) {
        t.string('position')
        t.string('role')
        t.string('description')
        t.string('applyUrl')
        t.boolean('remote')
        t.list.id('tags')
      },
    }),
  },
  async resolve(_root, { input }, ctx) {
    const job = await ctx.db.job.create({
      data: {
        position: input.position,
        role: input.role,
        description: input.description,
        applyUrl: input.applyUrl,
        remote: input.remote,
        tags: {
          connect: input.tags.map(tagId => ({ id: tagId })),
        },
        user: {
          connect: {
            id: ctx.user.id,
          },
        },
      },
    })

    return job
  },
})
