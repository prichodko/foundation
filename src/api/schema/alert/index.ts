import { objectType } from 'nexus'

export * from './create-alert'
export * from './remove-alert'

export const Alert = objectType({
  name: 'Alert',
  definition(t) {
    t.id('id')
    t.json('filter', {
      resolve(parent) {
        return parent.filter as JsonObject
      },
    })
  },
})
