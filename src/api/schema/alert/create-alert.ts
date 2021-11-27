import { UserInputError } from 'apollo-server-errors'
import { mutationField, inputObjectType } from 'nexus'

const validateFilter = (filter: JsonObject) => {
  const values = Object.values(filter)

  if (values.length === 0) {
    throw new UserInputError('Filter cannot be empty')
  }

  // throw new UserInputError('Not implemented')
}

export const CreateAlert = mutationField('createAlert', {
  type: 'Alert',

  args: {
    input: inputObjectType({
      name: 'CreateAlertInput',
      definition(t) {
        t.json('filter')
      },
    }),
  },

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, { input }, ctx) {
    validateFilter(input.filter)

    const alert = await ctx.prisma.alert.create({
      data: {
        userId: ctx.user!.id,
        filter: input.filter,
      },
    })

    return alert
  },
})
