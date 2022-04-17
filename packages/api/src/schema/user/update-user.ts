import { inputObjectType, mutationField } from 'nexus'

import { userSchema } from '../../validation/user'

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

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, { input }, ctx) {
    const data = userSchema.update.create(input)

    const user = await ctx.db.user.update({
      where: {
        id: ctx.user!.id,
      },
      data: {
        name: data.name,
      },
    })

    return user
  },
})
