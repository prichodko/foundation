import { mutationField, idArg } from 'nexus'

export const RemoveAlert = mutationField('removeAlert', {
  type: 'SuccessResult',

  args: {
    id: idArg(),
  },

  authorize: (_parent, args, ctx) => ctx.auth.owner.alert(args.id),

  async resolve(_root, { id }, ctx) {
    await ctx.prisma.alert.delete({
      where: {
        id,
      },
    })

    return {
      success: true,
    }
  },
})
