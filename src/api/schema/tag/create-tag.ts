import { mutationField, inputObjectType } from 'nexus'

export const CreateTag = mutationField('createTag', {
  type: 'Tag',
  args: {
    input: inputObjectType({
      name: 'CreateTagInput',
      definition(t) {
        t.string('name')
      },
    }),
  },
  async resolve(_root, { input }, ctx) {
    const tag = await ctx.db.tag.create({
      data: {
        name: input.name,
      },
    })

    return tag
  },
})
