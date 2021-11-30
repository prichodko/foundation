import type {
  Resolver as GraphCacheResolver,
  UpdateResolver as GraphCacheUpdateResolver,
  OptimisticMutationResolver as GraphCacheOptimisticMutationResolver,
  StorageAdapter as GraphCacheStorageAdapter,
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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: JsonObject
}

export type Alert = {
  __typename?: 'Alert'
  filter: Scalars['JSONObject']
  id: Scalars['ID']
}

export type CheckoutSessionResult = {
  __typename?: 'CheckoutSessionResult'
  amount: Scalars['Int']
  id: Scalars['String']
}

export type City = {
  __typename?: 'City'
  id: Scalars['ID']
  name: Scalars['String']
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

export type CompanySearch = {
  __typename?: 'CompanySearch'
  id: Scalars['ID']
  name: Scalars['String']
}

export type CreateAlertInput = {
  filter: Scalars['JSONObject']
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

export type CreateFeedbackInput = {
  email?: InputMaybe<Scalars['String']>
  message: Scalars['String']
  reaction: FeedbackReaction
}

export type CreateJobInput = {
  applyUrl: Scalars['String']
  description: Scalars['String']
  position: Scalars['String']
  remote: Scalars['Boolean']
  role: JobRole
  tags: Array<Scalars['ID']>
  type: JobType
}

export type CreateTagInput = {
  name: Scalars['String']
}

export const enum FeedbackReaction {
  Happy = 'Happy',
  Neutral = 'Neutral',
  Sad = 'Sad',
}

export type Job = {
  __typename?: 'Job'
  applyUrl: Scalars['String']
  archivedAt?: Maybe<Scalars['DateTime']>
  company: Company
  createdAt: Scalars['DateTime']
  description: Scalars['JSONObject']
  id: Scalars['ID']
  liked: Scalars['Boolean']
  position: Scalars['String']
  remote: Scalars['Boolean']
  role: JobRole
  status: JobStatus
  tags: Array<Tag>
  type: JobType
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

export const enum JobType {
  Contract = 'Contract',
  FullTime = 'FullTime',
  Internship = 'Internship',
  PartTime = 'PartTime',
}

export type JobsFilter = {
  company?: InputMaybe<Array<Scalars['ID']>>
  position?: InputMaybe<Scalars['String']>
  remote?: InputMaybe<Scalars['Boolean']>
  role?: InputMaybe<JobRole>
  salaryMax?: InputMaybe<Scalars['Int']>
  salaryMin?: InputMaybe<Scalars['Int']>
  tags?: InputMaybe<Array<Scalars['ID']>>
}

export type Mutation = {
  __typename?: 'Mutation'
  addLike: Job
  archiveJob: Job
  createAlert: Alert
  createBillingPortalSession: CreateBillingPortalSessionResult
  createCheckoutSession: CreateCheckoutSessionResult
  createFeedback: SuccessResult
  createJob: Job
  createTag: Tag
  publishJob: Job
  removeAlert: SuccessResult
  removeLike: Job
  unpublishJob: Job
  updateCompany: Company
  updateJob: Job
  updateUser: User
  viewCompany: Company
  viewJob: Job
}

export type MutationAddLikeArgs = {
  id: Scalars['ID']
}

export type MutationArchiveJobArgs = {
  id: Scalars['ID']
}

export type MutationCreateAlertArgs = {
  input: CreateAlertInput
}

export type MutationCreateCheckoutSessionArgs = {
  input: CreateCheckoutSessionInput
}

export type MutationCreateFeedbackArgs = {
  input: CreateFeedbackInput
}

export type MutationCreateJobArgs = {
  input: CreateJobInput
}

export type MutationCreateTagArgs = {
  input: CreateTagInput
}

export type MutationPublishJobArgs = {
  id: Scalars['ID']
}

export type MutationRemoveAlertArgs = {
  id: Scalars['ID']
}

export type MutationRemoveLikeArgs = {
  id: Scalars['ID']
}

export type MutationUnpublishJobArgs = {
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
  companies: Array<Company>
  company: Company
  companyBySlug: Company
  job: Job
  jobs: Array<Job>
  searchCities: Array<City>
  searchCompanies: Array<CompanySearch>
  searchTags: Array<TagSearch>
  user: User
}

export type QueryCheckoutSessionArgs = {
  id: Scalars['ID']
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
  filter: JobsFilter
}

export type QuerySearchCitiesArgs = {
  country: Scalars['String']
  name: Scalars['String']
}

export type QuerySearchCompaniesArgs = {
  name: Scalars['String']
  not: Array<Scalars['String']>
}

export type QuerySearchTagsArgs = {
  name: Scalars['String']
  not: Array<Scalars['String']>
}

export type SuccessResult = {
  __typename?: 'SuccessResult'
  success: Scalars['Boolean']
}

export type Tag = {
  __typename?: 'Tag'
  id: Scalars['ID']
  name: Scalars['String']
}

export type TagSearch = {
  __typename?: 'TagSearch'
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
  description: Scalars['JSONObject']
  id: Scalars['ID']
  position: Scalars['String']
  remote: Scalars['Boolean']
  role: JobRole
  tags: Array<Scalars['ID']>
}

export type UpdateUserInput = {
  name: Scalars['String']
}

export type User = {
  __typename?: 'User'
  alerts: Array<Alert>
  company?: Maybe<Company>
  email: Scalars['String']
  id: Scalars['ID']
  jobs: Array<Job>
  likes: Array<Job>
  name?: Maybe<Scalars['String']>
}

export type WithTypename<T extends { __typename?: any }> = {
  [K in Exclude<keyof T, '__typename'>]?: T[K]
} & { __typename: NonNullable<T['__typename']> }

export type GraphCacheKeysConfig = {
  Alert?: (data: WithTypename<Alert>) => null | string
  CheckoutSessionResult?: (
    data: WithTypename<CheckoutSessionResult>
  ) => null | string
  City?: (data: WithTypename<City>) => null | string
  Company?: (data: WithTypename<Company>) => null | string
  CompanySearch?: (data: WithTypename<CompanySearch>) => null | string
  CreateBillingPortalSessionResult?: (
    data: WithTypename<CreateBillingPortalSessionResult>
  ) => null | string
  CreateCheckoutSessionResult?: (
    data: WithTypename<CreateCheckoutSessionResult>
  ) => null | string
  Job?: (data: WithTypename<Job>) => null | string
  SuccessResult?: (data: WithTypename<SuccessResult>) => null | string
  Tag?: (data: WithTypename<Tag>) => null | string
  TagSearch?: (data: WithTypename<TagSearch>) => null | string
  User?: (data: WithTypename<User>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    checkoutSession?: GraphCacheResolver<
      WithTypename<Query>,
      QueryCheckoutSessionArgs,
      WithTypename<CheckoutSessionResult> | string
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
    searchCities?: GraphCacheResolver<
      WithTypename<Query>,
      QuerySearchCitiesArgs,
      Array<WithTypename<City> | string>
    >
    searchCompanies?: GraphCacheResolver<
      WithTypename<Query>,
      QuerySearchCompaniesArgs,
      Array<WithTypename<CompanySearch> | string>
    >
    searchTags?: GraphCacheResolver<
      WithTypename<Query>,
      QuerySearchTagsArgs,
      Array<WithTypename<TagSearch> | string>
    >
    user?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      WithTypename<User> | string
    >
  }
  Alert?: {
    filter?: GraphCacheResolver<
      WithTypename<Alert>,
      Record<string, never>,
      Scalars['JSONObject'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<Alert>,
      Record<string, never>,
      Scalars['ID'] | string
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
    id?: GraphCacheResolver<
      WithTypename<City>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    name?: GraphCacheResolver<
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
  CompanySearch?: {
    id?: GraphCacheResolver<
      WithTypename<CompanySearch>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    name?: GraphCacheResolver<
      WithTypename<CompanySearch>,
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
    archivedAt?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      Scalars['DateTime'] | string
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
      Scalars['JSONObject'] | string
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
    type?: GraphCacheResolver<
      WithTypename<Job>,
      Record<string, never>,
      JobType | string
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
  TagSearch?: {
    count?: GraphCacheResolver<
      WithTypename<TagSearch>,
      Record<string, never>,
      Scalars['Int'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<TagSearch>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    name?: GraphCacheResolver<
      WithTypename<TagSearch>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  User?: {
    alerts?: GraphCacheResolver<
      WithTypename<User>,
      Record<string, never>,
      Array<WithTypename<Alert> | string>
    >
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
  archiveJob?: GraphCacheOptimisticMutationResolver<
    MutationArchiveJobArgs,
    WithTypename<Job>
  >
  createAlert?: GraphCacheOptimisticMutationResolver<
    MutationCreateAlertArgs,
    WithTypename<Alert>
  >
  createBillingPortalSession?: GraphCacheOptimisticMutationResolver<
    Record<string, never>,
    WithTypename<CreateBillingPortalSessionResult>
  >
  createCheckoutSession?: GraphCacheOptimisticMutationResolver<
    MutationCreateCheckoutSessionArgs,
    WithTypename<CreateCheckoutSessionResult>
  >
  createFeedback?: GraphCacheOptimisticMutationResolver<
    MutationCreateFeedbackArgs,
    WithTypename<SuccessResult>
  >
  createJob?: GraphCacheOptimisticMutationResolver<
    MutationCreateJobArgs,
    WithTypename<Job>
  >
  createTag?: GraphCacheOptimisticMutationResolver<
    MutationCreateTagArgs,
    WithTypename<Tag>
  >
  publishJob?: GraphCacheOptimisticMutationResolver<
    MutationPublishJobArgs,
    WithTypename<Job>
  >
  removeAlert?: GraphCacheOptimisticMutationResolver<
    MutationRemoveAlertArgs,
    WithTypename<SuccessResult>
  >
  removeLike?: GraphCacheOptimisticMutationResolver<
    MutationRemoveLikeArgs,
    WithTypename<Job>
  >
  unpublishJob?: GraphCacheOptimisticMutationResolver<
    MutationUnpublishJobArgs,
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
    archiveJob?: GraphCacheUpdateResolver<
      { archiveJob: WithTypename<Job> },
      MutationArchiveJobArgs
    >
    createAlert?: GraphCacheUpdateResolver<
      { createAlert: WithTypename<Alert> },
      MutationCreateAlertArgs
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
    createFeedback?: GraphCacheUpdateResolver<
      { createFeedback: WithTypename<SuccessResult> },
      MutationCreateFeedbackArgs
    >
    createJob?: GraphCacheUpdateResolver<
      { createJob: WithTypename<Job> },
      MutationCreateJobArgs
    >
    createTag?: GraphCacheUpdateResolver<
      { createTag: WithTypename<Tag> },
      MutationCreateTagArgs
    >
    publishJob?: GraphCacheUpdateResolver<
      { publishJob: WithTypename<Job> },
      MutationPublishJobArgs
    >
    removeAlert?: GraphCacheUpdateResolver<
      { removeAlert: WithTypename<SuccessResult> },
      MutationRemoveAlertArgs
    >
    removeLike?: GraphCacheUpdateResolver<
      { removeLike: WithTypename<Job> },
      MutationRemoveLikeArgs
    >
    unpublishJob?: GraphCacheUpdateResolver<
      { unpublishJob: WithTypename<Job> },
      MutationUnpublishJobArgs
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
