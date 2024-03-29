import {
  coerce,
  define,
  nonempty,
  optional,
  refine,
  string,
  trimmed,
} from 'superstruct'

import type { NexusGenEnums, NexusGenInputs } from '../types/nexus'
import type { Describe, Struct } from 'superstruct'

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
    const regexp =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    return regexp.test(value) || `Expected a url, but received ${value}`
  })
}

export function email() {
  return refine(string(), 'email', value => {
    if (value.length === 0) return true
    const regexp = /^\S+@\S+\.\S+$/
    return regexp.test(value) || `Expected an email, but received ${value}`
  })
}

export function required<T extends string, S>(
  struct: Struct<T, S>
): Struct<T, S> {
  return nonempty(trimmed(struct))
}

export function maybe<T extends string, S>(
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
      (typeof value === 'string' && value !== '') ||
      `Expected ${key} enum, but received: ${value}`
    )
  })
}

export function twitter<T extends string, S>(
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
