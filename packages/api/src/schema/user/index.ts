import { objectType } from 'nexus'

export * from './get-user'
export * from './update-user'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
  },
})
