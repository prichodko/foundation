import { inputObjectType, mutationField } from 'nexus'

import { companySchema } from '~/validation/company'

export const UpdateCompany = mutationField('updateCompany', {
  type: 'Company',

  args: {
    input: inputObjectType({
      name: 'UpdateCompanyInput',
      definition(t) {
        t.id('id')
        t.string('name')
        t.string('email')
        t.string('description')
        t.string('website')
        t.nullable.string('twitter')
      },
    }),
  },

  authorize: (_root, args, ctx) => ctx.auth.owner.company(args.input.id),

  async resolve(_root, { input }, ctx) {
    const data = companySchema.update.create(input)

    const company = await ctx.prisma.company.update({
      where: {
        id: input.id,
      },
      data: {
        name: data.name,
        email: data.email,
        twitter: data.twitter,
        website: data.website,
        description: data.description,
      },
    })

    return company
  },
})
