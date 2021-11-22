import { mutationField, idArg } from 'nexus'

export const ViewCompany = mutationField('viewCompany', {
  type: 'Company',
  args: {
    id: idArg(),
  },
  async resolve(_root, { id }, ctx) {
    const company = await ctx.prisma.company.update({
      where: {
        id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    return company
  },
})
