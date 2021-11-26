import { objectType } from 'nexus'

export * from './create-tag'
export * from './search-tags'

export const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.id('id')
    t.string('name')
  },
})
