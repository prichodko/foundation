import {
  Resolver as GraphCacheResolver,
  UpdateResolver as GraphCacheUpdateResolver,
  OptimisticMutationResolver as GraphCacheOptimisticMutationResolver,
  StorageAdapter as GraphCacheStorageAdapter,
} from '@urql/exchange-graphcache'
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: JsonObject
}

export type CheckoutSessionResult = {
  __typename?: 'CheckoutSessionResult'
  amount: Scalars['Int']
  id: Scalars['String']
}

export type CreateBillingPortalSessionResult = {
  __typename?: 'CreateBillingPortalSessionResult'
  url: Scalars['String']
}

export type CreateCheckoutSessionInput = {
  name: Scalars['String']
  price: Scalars['Int']
}

export type CreateCheckoutSessionResult = {
  __typename?: 'CreateCheckoutSessionResult'
  sessionUrl: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createBillingPortalSession: CreateBillingPortalSessionResult
  createCheckoutSession: CreateCheckoutSessionResult
  updateUser: User
}

export type MutationCreateCheckoutSessionArgs = {
  input: CreateCheckoutSessionInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type Query = {
  __typename?: 'Query'
  checkoutSession: CheckoutSessionResult
  user: User
}

export type QueryCheckoutSessionArgs = {
  id: Scalars['ID']
}

export type SuccessResult = {
  __typename?: 'SuccessResult'
  success: Scalars['Boolean']
}

export type UpdateUserInput = {
  name: Scalars['String']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  name: Scalars['String']
}

export type WithTypename<T extends { __typename?: any }> = T & {
  __typename: NonNullable<T['__typename']>
}

export type GraphCacheKeysConfig = {
  CheckoutSessionResult?: (
    data: WithTypename<CheckoutSessionResult>
  ) => null | string
  CreateBillingPortalSessionResult?: (
    data: WithTypename<CreateBillingPortalSessionResult>
  ) => null | string
  CreateCheckoutSessionResult?: (
    data: WithTypename<CreateCheckoutSessionResult>
  ) => null | string
  SuccessResult?: (data: WithTypename<SuccessResult>) => null | string
  User?: (data: WithTypename<User>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    checkoutSession?: GraphCacheResolver<
      WithTypename<Query>,
      QueryCheckoutSessionArgs,
      WithTypename<CheckoutSessionResult> | string
    >
    user?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      WithTypename<User> | string
    >
  }
  CheckoutSessionResult?: {
    amount?: GraphCacheResolver<
      WithTypename<CheckoutSessionResult>,
      Record<string, never>,
      Scalars['Int'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<CheckoutSessionResult>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  CreateBillingPortalSessionResult?: {
    url?: GraphCacheResolver<
      WithTypename<CreateBillingPortalSessionResult>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  CreateCheckoutSessionResult?: {
    sessionUrl?: GraphCacheResolver<
      WithTypename<CreateCheckoutSessionResult>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  SuccessResult?: {
    success?: GraphCacheResolver<
      WithTypename<SuccessResult>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
  }
  User?: {
    id?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    name?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
}

export type GraphCacheOptimisticUpdaters = {
  createBillingPortalSession?: GraphCacheOptimisticMutationResolver<
    Record<string, never>,
    WithTypename<CreateBillingPortalSessionResult>
  >
  createCheckoutSession?: GraphCacheOptimisticMutationResolver<
    MutationCreateCheckoutSessionArgs,
    WithTypename<CreateCheckoutSessionResult>
  >
  updateUser?: GraphCacheOptimisticMutationResolver<
    MutationUpdateUserArgs,
    WithTypename<User>
  >
}

export type GraphCacheUpdaters = {
  Mutation?: {
    createBillingPortalSession?: GraphCacheUpdateResolver<
      {
        createBillingPortalSession: WithTypename<CreateBillingPortalSessionResult>
      },
      Record<string, never>
    >
    createCheckoutSession?: GraphCacheUpdateResolver<
      { createCheckoutSession: WithTypename<CreateCheckoutSessionResult> },
      MutationCreateCheckoutSessionArgs
    >
    updateUser?: GraphCacheUpdateResolver<
      { updateUser: WithTypename<User> },
      MutationUpdateUserArgs
    >
  }
  Subscription?: {}
}

export type GraphCacheConfig = {
  schema?: IntrospectionData
  updates?: GraphCacheUpdaters
  keys?: GraphCacheKeysConfig
  optimistic?: GraphCacheOptimisticUpdaters
  resolvers?: GraphCacheResolvers
  storage?: GraphCacheStorageAdapter
}
