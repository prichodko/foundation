import { UserInputError } from 'apollo-server-errors'
import { idArg, queryField } from 'nexus'

export const GetCompany = queryField('company', {
  type: 'Company',
  args: {
    id: idArg(),
  },
  async resolve(_root, { id }, ctx) {
    const company = await ctx.db.company.findUnique({
      where: {
        id,
      },
    })

    if (!company) {
      throw new UserInputError(`Company with id '${id}' not found!`)
    }

    return company
  },
})
