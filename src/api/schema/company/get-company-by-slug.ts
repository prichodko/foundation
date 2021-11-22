import { UserInputError } from 'apollo-server-errors'
import { stringArg, queryField } from 'nexus'

export const GetCompanyBySlug = queryField('companyBySlug', {
  type: 'Company',
  args: {
    slug: stringArg(),
  },
  async resolve(_root, { slug }, ctx) {
    const company = await ctx.prisma.company.findUnique({
      where: {
        slug,
      },
    })

    if (!company) {
      throw new UserInputError('Company not found', { type: 'not_found' })
    }

    return company
  },
})
