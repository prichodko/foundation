import isEmail from 'is-email'
import isUrl from 'is-url-superb'
import type { Describe, Struct } from 'superstruct'
import {
  optional,
  coerce,
  nonempty,
  trimmed,
  define,
  string,
  refine,
} from 'superstruct'

import type { NexusGenInputs, NexusGenEnums } from '~/api/types/nexus'

// Coerce enums to strings, because GraphQL validation takes care of it
// type Simplify<T> = { [K in keyof T]: T[K] extends string ? string : T[K] }

export type Schema<Key extends keyof NexusGenInputs> = Describe<
  Required<NexusGenInputs[Key]>
>

// const isEmail = (value:any) => true
// const isUrl = (value:any) => true

// types
export function json(): Struct<JsonObject, null> {
  return define('json', value => {
    return (
      typeof value === 'object' ||
      `Expected a JSON object, but received: ${value}`
    )
  })
}

// refinements
export function url() {
  return refine(string(), 'url', value => {
    if (value.length === 0) return true
    return isUrl(value) || `Expected a url, but received ${value}`
  })
}

export function email() {
  return refine(string(), 'email', value => {
    if (value.length === 0) return true
    return isEmail(value) || `Expected an email, but received ${value}`
  })
}

export function required<T extends string, S extends any>(
  struct: Struct<T, S>
): Struct<T, S> {
  return nonempty(trimmed(struct))
}

export function maybe<T extends string, S extends any>(
  struct: Struct<T, S>
): Struct<string | null, S> {
  return coerce(
    optional(trimmed(struct)),
    optional(trimmed(string())),
    value => {
      return value === '' ? undefined : value
    }
  ) as unknown as Struct<string | null, S>
}

export function enums<Key extends keyof NexusGenEnums>(
  key: Key
): Struct<NexusGenEnums[Key], any> {
  return define('enums', value => {
    return (
      typeof value === 'string' ||
      `Expected ${key} enum, but received: ${value}`
    )
  })
}

export function twitter<T extends string, S extends any>(
  struct: Struct<T, S>
): Struct<T, S> {
  return refine(struct, 'twitter', value => {
    const regexp = /^[a-zA-Z0-9_]{1,15}$/
    return (
      regexp.test(value) ||
      `Expected a ${struct.type} matching \`/${regexp.source}/\` but received "${value}"`
    )
  })
}
