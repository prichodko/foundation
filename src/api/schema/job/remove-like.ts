import { mutationField, idArg } from 'nexus'

export const RemoveLike = mutationField('removeLike', {
  type: 'Job',

  args: {
    id: idArg(),
  },

  authorize: (_parent, args, ctx) => ctx.auth.owner.job(args.id),

  async resolve(_root, { id }, ctx) {
    const user = ctx.user!

    await ctx.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        likes: {
          deleteMany: [{ jobId: id }],
        },
      },
    })

    const job = await ctx.prisma.job.findUnique({
      where: {
        id,
      },
    })

    return job!
  },
})
