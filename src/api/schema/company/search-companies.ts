import { list, objectType, queryField, stringArg } from 'nexus'

export const CompanySearch = objectType({
  name: 'CompanySearch',
  definition(t) {
    t.id('id')
    t.string('name')
  },
})

export const SearchCompanies = queryField('searchCompanies', {
  type: list('CompanySearch'),
  args: {
    name: stringArg(),
    not: list(stringArg()),
  },
  async resolve(_root, { name, not }, ctx) {
    const companies = await ctx.prisma.company.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        id: {
          notIn: not,
        },
      },
      take: 10,
    })

    return companies
  },
})
