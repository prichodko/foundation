export type Maybe<T> = T | null
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
  role: JobRole
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
  role: JobRole
  status: JobStatus
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
  role: JobRole
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
