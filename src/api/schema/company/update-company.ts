import { inputObjectType, mutationField } from 'nexus'

export const UpdateCompany = mutationField('updateCompany', {
  type: 'Company',
  args: {
    input: inputObjectType({
      name: 'UpdateCompanyInput',
      definition(t) {
        t.id('id')
        t.string('name')
        t.string('email')
        t.string('website')
        t.string('twitter')
      },
    }),
  },
  async resolve(_root, { input }, ctx) {
    const company = await ctx.db.company.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        email: input.email,
        twitter: input.twitter,
        website: input.website,
      },
    })

    return company
  },
})
