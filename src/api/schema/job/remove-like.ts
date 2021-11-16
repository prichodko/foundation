import { mutationField, idArg } from 'nexus'

export const RemoveLike = mutationField('removeLike', {
  type: 'Job',
  args: {
    id: idArg(),
  },
  async resolve(_root, { id }, ctx) {
    await ctx.db.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        likes: {
          deleteMany: [{ jobId: id }],
        },
      },
    })

    const job = await ctx.db.job.findUnique({
      where: {
        id,
      },
    })

    return job!
  },
})
