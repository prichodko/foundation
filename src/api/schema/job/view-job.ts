import { mutationField, idArg } from 'nexus'

export const ViewJob = mutationField('viewJob', {
  type: 'Job',
  args: {
    id: idArg(),
  },
  async resolve(_root, { id }, ctx) {
    const job = await ctx.db.job.update({
      where: {
        id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    return job
  },
})
