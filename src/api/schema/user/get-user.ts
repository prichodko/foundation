import { queryField } from 'nexus'

export const GetUser = queryField('user', {
  type: 'User',

  authorize: (_, __, ctx) => ctx.auth.user(ctx),

  async resolve(_, __, ctx) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      rejectOnNotFound: true,
    })

    return user
  },
})
