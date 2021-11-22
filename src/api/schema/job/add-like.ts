import { mutationField, idArg } from 'nexus'

export const AddLike = mutationField('addLike', {
  type: 'Job',
  args: {
    id: idArg(),
  },
  authorize: (_parent, _args, ctx) => ctx.auth.user(ctx),
  async resolve(_root, { id }, ctx) {
    const created = await ctx.prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        likes: {
          create: {
            jobId: id,
          },
        },
      },
      include: {
        likes: {
          where: {
            jobId: id,
          },
          include: {
            job: true,
          },
        },
      },
    })

    return created.likes[0].job
  },
})
