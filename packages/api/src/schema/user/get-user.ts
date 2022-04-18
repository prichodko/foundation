import { queryField } from 'nexus'

export const GetUser = queryField('user', {
  type: 'User',

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_, __, ctx) {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.user!.id,
      },
      rejectOnNotFound: true,
    })

    return user
  },
})
