import { mutationField, idArg } from 'nexus'

export const AddLike = mutationField('addLike', {
  type: 'Job',
  args: {
    id: idArg(),
  },
  async resolve(_root, { id }, ctx) {
    const created = await ctx.db.user.update({
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
