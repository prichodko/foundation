import { mutationField, idArg } from 'nexus'

export const UnpublishJob = mutationField('unpublishJob', {
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
        status: 'Draft',
      },
    })

    return job
  },
})
