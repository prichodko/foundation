/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type * as prisma from '.prisma/client'
import type { Context } from './../context'
import type { FieldAuthorizeResolver } from 'nexus/dist/plugins/fieldAuthorizePlugin'
import type { core } from 'nexus'
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "DateTime";
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "JSONObject";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "DateTime";
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "JSONObject";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateCheckoutSessionInput: {
    // input type
    name: string // String!
    price: number // Int!
  }
  UpdateUserInput: {
    // input type
    name: string // String!
  }
}

export interface NexusGenEnums {}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: Date
  JSONObject: JsonObject
}

export interface NexusGenObjects {
  CheckoutSessionResult: {
    // root type
    amount: number // Int!
    id: string // String!
  }
  CreateBillingPortalSessionResult: {
    // root type
    url: string // String!
  }
  CreateCheckoutSessionResult: {
    // root type
    sessionUrl: string // String!
  }
  Mutation: {}
  Query: {}
  SuccessResult: {
    // root type
    success: boolean // Boolean!
  }
  User: prisma.User
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  CheckoutSessionResult: {
    // field return type
    amount: number // Int!
    id: string // String!
  }
  CreateBillingPortalSessionResult: {
    // field return type
    url: string // String!
  }
  CreateCheckoutSessionResult: {
    // field return type
    sessionUrl: string // String!
  }
  Mutation: {
    // field return type
    createBillingPortalSession: NexusGenRootTypes['CreateBillingPortalSessionResult'] // CreateBillingPortalSessionResult!
    createCheckoutSession: NexusGenRootTypes['CreateCheckoutSessionResult'] // CreateCheckoutSessionResult!
    updateUser: NexusGenRootTypes['User'] // User!
  }
  Query: {
    // field return type
    checkoutSession: NexusGenRootTypes['CheckoutSessionResult'] // CheckoutSessionResult!
    user: NexusGenRootTypes['User'] // User!
  }
  SuccessResult: {
    // field return type
    success: boolean // Boolean!
  }
  User: {
    // field return type
    id: string // ID!
    name: string // String!
  }
}

export interface NexusGenFieldTypeNames {
  CheckoutSessionResult: {
    // field return type name
    amount: 'Int'
    id: 'String'
  }
  CreateBillingPortalSessionResult: {
    // field return type name
    url: 'String'
  }
  CreateCheckoutSessionResult: {
    // field return type name
    sessionUrl: 'String'
  }
  Mutation: {
    // field return type name
    createBillingPortalSession: 'CreateBillingPortalSessionResult'
    createCheckoutSession: 'CreateCheckoutSessionResult'
    updateUser: 'User'
  }
  Query: {
    // field return type name
    checkoutSession: 'CheckoutSessionResult'
    user: 'User'
  }
  SuccessResult: {
    // field return type name
    success: 'Boolean'
  }
  User: {
    // field return type name
    id: 'ID'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createCheckoutSession: {
      // args
      input: NexusGenInputs['CreateCheckoutSessionInput'] // CreateCheckoutSessionInput!
    }
    updateUser: {
      // args
      input: NexusGenInputs['UpdateUserInput'] // UpdateUserInput!
    }
  }
  Query: {
    checkoutSession: {
      // args
      id: string // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = never

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = never

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = never

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  fieldTypeNames: NexusGenFieldTypeNames
  allTypes: NexusGenAllTypes
  typeInterfaces: NexusGenTypeInterfaces
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames']
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames']
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
  abstractTypeMembers: NexusGenAbstractTypeMembers
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType
  features: NexusGenFeaturesConfig
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
