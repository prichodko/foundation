import type {
  OptimisticMutationResolver as GraphCacheOptimisticMutationResolver,
  Resolver as GraphCacheResolver,
  StorageAdapter as GraphCacheStorageAdapter,
  UpdateResolver as GraphCacheUpdateResolver,
} from '@urql/exchange-graphcache'
import type { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast'

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
}

export type CheckoutSessionResult = {
  __typename?: 'CheckoutSessionResult'
  amount: Scalars['Int']
  id: Scalars['String']
}

export type City = {
  __typename?: 'City'
  label: Scalars['ID']
  value: Scalars['String']
}

export type Company = {
  __typename?: 'Company'
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  email: Scalars['String']
  id: Scalars['ID']
  jobs: Array<Job>
  name: Scalars['String']
  slug: Scalars['String']
  twitter?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  viewCount: Scalars['Int']
  website: Scalars['String']
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

export type CreateJobInput = {
  applyUrl: Scalars['String']
  description: Scalars['String']
  position: Scalars['String']
  remote: Scalars['Boolean']
  role: JobRole | `${JobRole}`
  tags: Array<Scalars['ID']>
}

export type CreateTagInput = {
  name: Scalars['String']
}

export type GetCitiesInput = {
  country: Scalars['String']
  query: Scalars['String']
}

export type GetJobsInput = {
  query: GetJobsInputQuery
}

export type GetJobsInputQuery = {
  remote: Scalars['Boolean']
  tags: Array<Scalars['ID']>
}

export type GetTagsInput = {
  notIn: Array<Scalars['String']>
  query: Scalars['String']
}

export type Job = {
  __typename?: 'Job'
  applyUrl: Scalars['String']
  company: Company
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  id: Scalars['ID']
  liked: Scalars['Boolean']
  position: Scalars['String']
  remote: Scalars['Boolean']
  role: JobRole | `${JobRole}`
  status: JobStatus | `${JobStatus}`
  tags: Array<Tag>
  updatedAt: Scalars['DateTime']
  viewCount: Scalars['Int']
}

export const enum JobRole {
  AccountingAndFinance = 'AccountingAndFinance',
  Administration = 'Administration',
  BusinessDevelopment = 'BusinessDevelopment',
  CustomerService = 'CustomerService',
  Design = 'Design',
  Engineering = 'Engineering',
  It = 'IT',
  Legal = 'Legal',
  MarketingAndCommunications = 'MarketingAndCommunications',
  Operations = 'Operations',
  Other = 'Other',
  PeopleAndHr = 'PeopleAndHR',
  Product = 'Product',
  QualityAssurance = 'QualityAssurance',
  Sales = 'Sales',
}

export const enum JobStatus {
  Archived = 'Archived',
  Closed = 'Closed',
  Draft = 'Draft',
  Live = 'Live',
}

export type Mutation = {
  __typename?: 'Mutation'
  addLike: Job
  createBillingPortalSession: CreateBillingPortalSessionResult
  createCheckoutSession: CreateCheckoutSessionResult
  createJob: Job
  createTag: Tag
  removeLike: Job
  updateCompany: Company
  updateJob: Job
  updateUser: User
  viewCompany: Company
  viewJob: Job
}

export type MutationAddLikeArgs = {
  id: Scalars['ID']
}

export type MutationCreateCheckoutSessionArgs = {
  input: CreateCheckoutSessionInput
}

export type MutationCreateJobArgs = {
  input: CreateJobInput
}

export type MutationCreateTagArgs = {
  input: CreateTagInput
}

export type MutationRemoveLikeArgs = {
  id: Scalars['ID']
}

export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput
}

export type MutationUpdateJobArgs = {
  input: UpdateJobInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationViewCompanyArgs = {
  id: Scalars['ID']
}

export type MutationViewJobArgs = {
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  checkoutSession: CheckoutSessionResult
  cities: Array<City>
  companies: Array<Company>
  company: Company
  companyBySlug: Company
  job: Job
  jobs: Array<Job>
  tags: Array<Tag>
  user: User
}

export type QueryCheckoutSessionArgs = {
  id: Scalars['ID']
}

export type QueryCitiesArgs = {
  input: GetCitiesInput
}

export type QueryCompanyArgs = {
  id: Scalars['ID']
}

export type QueryCompanyBySlugArgs = {
  slug: Scalars['String']
}

export type QueryJobArgs = {
  id: Scalars['ID']
}

export type QueryJobsArgs = {
  input: GetJobsInput
}

export type QueryTagsArgs = {
  input: GetTagsInput
}

export type SuccessResult = {
  __typename?: 'SuccessResult'
  success: Scalars['Boolean']
}

export type Tag = {
  __typename?: 'Tag'
  count: Scalars['Int']
  id: Scalars['ID']
  name: Scalars['String']
}

export type UpdateCompanyInput = {
  email: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  twitter: Scalars['String']
  website: Scalars['String']
}

export type UpdateJobInput = {
  applyUrl: Scalars['String']
  description: Scalars['String']
  id: Scalars['ID']
  position: Scalars['String']
  remote: Scalars['Boolean']
  role: JobRole | `${JobRole}`
  tags: Array<Scalars['ID']>
}

export type UpdateUserInput = {
  name: Scalars['String']
}

export type User = {
  __typename?: 'User'
  company?: Maybe<Company>
  email?: Maybe<Scalars['String']>
  id: Scalars['ID']
  jobs: Array<Job>
  likes: Array<Job>
  name?: Maybe<Scalars['String']>
}

export type WithTypename<T extends { __typename?: any }> = T & {
  __typename: NonNullable<T['__typename']>
}

export type GraphCacheKeysConfig = {
  CheckoutSessionResult?: (
    data: WithTypename<CheckoutSessionResult>
  ) => null | string
  City?: (data: WithTypename<City>) => null | string
  Company?: (data: WithTypename<Company>) => null | string
  CreateBillingPortalSessionResult?: (
    data: WithTypename<CreateBillingPortalSessionResult>
  ) => null | string
  CreateCheckoutSessionResult?: (
    data: WithTypename<CreateCheckoutSessionResult>
  ) => null | string
  Job?: (data: WithTypename<Job>) => null | string
  SuccessResult?: (data: WithTypename<SuccessResult>) => null | string
  Tag?: (data: WithTypename<Tag>) => null | string
  User?: (data: WithTypename<User>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    checkoutSession?: GraphCacheResolver<
      WithTypename<Query>,
      QueryCheckoutSessionArgs,
      WithTypename<CheckoutSessionResult> | string
    >
    cities?: GraphCacheResolver<
      WithTypename<Query>,
      QueryCitiesArgs,
      Array<WithTypename<City> | string>
    >
    companies?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Array<WithTypename<Company> | string>
    >
    company?: GraphCacheResolver<
      WithTypename<Query>,
      QueryCompanyArgs,
      WithTypename<Company> | string
    >
    companyBySlug?: GraphCacheResolver<
      WithTypename<Query>,
      QueryCompanyBySlugArgs,
      WithTypename<Company> | string
    >
    job?: GraphCacheResolver<
      WithTypename<Query>,
      QueryJobArgs,
      WithTypename<Job> | string
    >
    jobs?: GraphCacheResolver<
      WithTypename<Query>,
      QueryJobsArgs,
      Array<WithTypename<Job> | string>
    >
    tags?: GraphCacheResolver<
      WithTypename<Query>,
      QueryTagsArgs,
      Array<WithTypename<Tag> | string>
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
  City?: {
    label?: GraphCacheResolver<
      WithTypename<City>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    value?: GraphCacheResolver<
      WithTypename<City>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  Company?: {
    createdAt?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['DateTime'] | string
    >
    description?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['String'] | string
    >
    email?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['String'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    jobs?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Array<WithTypename<Job> | string>
    >
    name?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['String'] | string
    >
    slug?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['String'] | string
    >
    twitter?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['String'] | string
    >
    updatedAt?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['DateTime'] | string
    >
    viewCount?: GraphCacheResolver<
      WithTypename<Company>,
      Record<string, never>,
      Scalars['Int'] | string
    >
    website?: GraphCacheResolver<
      WithTypename<Company>,
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
  Job?: {
    applyUrl?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['String'] | string
    >
    company?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      WithTypename<Company> | string
    >
    createdAt?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['DateTime'] | string
    >
    description?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['String'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    liked?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    position?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['String'] | string
    >
    remote?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    role?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      JobRole | string
    >
    status?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      JobStatus | string
    >
    tags?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Array<WithTypename<Tag> | string>
    >
    updatedAt?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['DateTime'] | string
    >
    viewCount?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  SuccessResult?: {
    success?: GraphCacheResolver<
      WithTypename<SuccessResult>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
  }
  Tag?: {
    count?: GraphCacheResolver<
      WithTypename<Tag>,
      Record<string, never>,
      Scalars['Int'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<Tag>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    name?: GraphCacheResolver<
      WithTypename<Tag>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  User?: {
    company?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      WithTypename<Company> | string
    >
    email?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      Scalars['String'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    jobs?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      Array<WithTypename<Job> | string>
    >
    likes?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      Array<WithTypename<Job> | string>
    >
    name?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
}

export type GraphCacheOptimisticUpdaters = {
  addLike?: GraphCacheOptimisticMutationResolver<
    MutationAddLikeArgs,
    WithTypename<Job>
  >
  createBillingPortalSession?: GraphCacheOptimisticMutationResolver<
    Record<string, never>,
    WithTypename<CreateBillingPortalSessionResult>
  >
  createCheckoutSession?: GraphCacheOptimisticMutationResolver<
    MutationCreateCheckoutSessionArgs,
    WithTypename<CreateCheckoutSessionResult>
  >
  createJob?: GraphCacheOptimisticMutationResolver<
    MutationCreateJobArgs,
    WithTypename<Job>
  >
  createTag?: GraphCacheOptimisticMutationResolver<
    MutationCreateTagArgs,
    WithTypename<Tag>
  >
  removeLike?: GraphCacheOptimisticMutationResolver<
    MutationRemoveLikeArgs,
    WithTypename<Job>
  >
  updateCompany?: GraphCacheOptimisticMutationResolver<
    MutationUpdateCompanyArgs,
    WithTypename<Company>
  >
  updateJob?: GraphCacheOptimisticMutationResolver<
    MutationUpdateJobArgs,
    WithTypename<Job>
  >
  updateUser?: GraphCacheOptimisticMutationResolver<
    MutationUpdateUserArgs,
    WithTypename<User>
  >
  viewCompany?: GraphCacheOptimisticMutationResolver<
    MutationViewCompanyArgs,
    WithTypename<Company>
  >
  viewJob?: GraphCacheOptimisticMutationResolver<
    MutationViewJobArgs,
    WithTypename<Job>
  >
}

export type GraphCacheUpdaters = {
  Mutation?: {
    addLike?: GraphCacheUpdateResolver<
      { addLike: WithTypename<Job> },
      MutationAddLikeArgs
    >
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
    createJob?: GraphCacheUpdateResolver<
      { createJob: WithTypename<Job> },
      MutationCreateJobArgs
    >
    createTag?: GraphCacheUpdateResolver<
      { createTag: WithTypename<Tag> },
      MutationCreateTagArgs
    >
    removeLike?: GraphCacheUpdateResolver<
      { removeLike: WithTypename<Job> },
      MutationRemoveLikeArgs
    >
    updateCompany?: GraphCacheUpdateResolver<
      { updateCompany: WithTypename<Company> },
      MutationUpdateCompanyArgs
    >
    updateJob?: GraphCacheUpdateResolver<
      { updateJob: WithTypename<Job> },
      MutationUpdateJobArgs
    >
    updateUser?: GraphCacheUpdateResolver<
      { updateUser: WithTypename<User> },
      MutationUpdateUserArgs
    >
    viewCompany?: GraphCacheUpdateResolver<
      { viewCompany: WithTypename<Company> },
      MutationViewCompanyArgs
    >
    viewJob?: GraphCacheUpdateResolver<
      { viewJob: WithTypename<Job> },
      MutationViewJobArgs
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
