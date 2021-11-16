import { list, queryField } from 'nexus'

export const GetCompanies = queryField('companies', {
  type: list('Company'),
  async resolve(_root, _args, ctx) {
    const companies = await ctx.db.company.findMany()
    return companies
  },
})
