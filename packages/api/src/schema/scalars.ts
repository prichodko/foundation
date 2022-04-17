import { GraphQLDateTime, GraphQLJSONObject } from 'graphql-scalars'
import { decorateType } from 'nexus'

export const DateTime = decorateType(GraphQLDateTime, {
  sourceType: 'Date',
  asNexusMethod: 'date',
})

export const Json = decorateType(GraphQLJSONObject, {
  sourceType: 'JsonObject',
  asNexusMethod: 'json',
})
