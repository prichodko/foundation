import { objectType } from 'nexus'

export * from './search-cities'

export const City = objectType({
  name: 'City',
  definition(t) {
    t.id('id')
    t.string('name')
  },
})
