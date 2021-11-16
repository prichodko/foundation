import { objectType } from 'nexus'

export * from './get-cities'

export const City = objectType({
  name: 'City',
  definition(t) {
    t.id('label')
    t.string('value')
  },
})
