import { mutationField, idArg } from 'nexus'

export const PublishJob = mutationField('publishJob', {
  type: 'Job',
  args: {
    id: idArg(),
  },
  async resolve(_root, { id }, ctx) {
    const job = await ctx.prisma.job.update({
      where: {
        id,
      },
      data: {
        status: 'Live',
      },
    })

    return job
  },
})
