import { mutationField, inputObjectType } from 'nexus'

import { companySchema } from '~/validation/company'

export const CreateCompany = mutationField('createCompany', {
  type: 'Company',

  args: {
    input: inputObjectType({
      name: 'CreateCompanyInput',
      definition(t) {
        t.string('name')
        t.string('email')
        t.string('description')
        t.string('slug')
        t.string('website')
        t.nullable.string('twitter')
      },
    }),
  },

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, { input }, ctx) {
    const data = companySchema.create.create(input)

    const alert = await ctx.prisma.company.create({
      data: {
        userId: ctx.user!.id,
        name: data.name,
        email: data.email,
        description: data.description,
        slug: data.slug,
        website: data.website,
        twitter: data.twitter,
      },
    })

    return alert
  },
})
