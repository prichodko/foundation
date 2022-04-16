import { queryField } from 'nexus'

export const GetUser = queryField('user', {
  type: 'User',
  async resolve(_, __, ctx) {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      rejectOnNotFound: true,
    })

    return user
  },
})
