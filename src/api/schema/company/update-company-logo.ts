import { inputObjectType, mutationField } from 'nexus'

export const UpdateCompanyLogo = mutationField('updateCompanyLogo', {
  type: 'Company',

  args: {
    input: inputObjectType({
      name: 'UpdateCompanyLogoInput',
      definition(t) {
        t.id('id')
        t.string('imageId')
      },
    }),
  },

  authorize: (_root, args, ctx) => ctx.auth.owner.company(args.input.id),

  async resolve(_root, { input }, ctx) {
    const company = await ctx.prisma.company.update({
      where: {
        id: input.id,
      },
      data: {
        logoUrl: input.imageId,
      },
    })

    return company
  },
})
