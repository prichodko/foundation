import { inputObjectType, mutationField, objectType, queryField } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.nullable.string('name')
    t.nullable.string('email')
  },
})

export const GetUser = queryField('user', {
  type: User,
  async resolve(_, __, ctx) {
    const u = await ctx.db.user.findUnique({
      where: {
        id: ctx.user.id,
      },
    })
    return u!
  },
})

export const UpdateUser = mutationField('updateUser', {
  type: User,
  args: {
    input: inputObjectType({
      name: 'UpdateUserInput',
      definition(t) {
        t.string('name')
      },
    }),
  },
  async resolve(_source, { input }, ctx) {
    const user = await ctx.db.user.update({
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
