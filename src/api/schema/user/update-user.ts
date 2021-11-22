import { mutationField, inputObjectType } from 'nexus'

export const UpdateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    input: inputObjectType({
      name: 'UpdateUserInput',
      definition(t) {
        t.string('name')
      },
    }),
  },
  authorize: (_, __, ctx) => ctx.auth.user(ctx),
  async resolve(_root, { input }, ctx) {
    const user = await ctx.prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        name: input.name,
      },
    })

    return user
  },
})
