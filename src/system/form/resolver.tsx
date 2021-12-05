import { set, get } from 'react-hook-form'
import type {
  UnpackNestedValue,
  FieldError,
  FieldErrors,
  Field,
  ResolverOptions,
  FieldValues,
  ResolverResult,
} from 'react-hook-form'
import type { Struct, StructError } from 'superstruct'
import { validate } from 'superstruct'

// FIXME: https://github.com/react-hook-form/resolvers/issues/271
type Resolver = <T extends Struct<any, any>>(
  schema: T
) => <TFieldValues extends FieldValues, TContext>(
  values: UnpackNestedValue<TFieldValues>,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>
) => ResolverResult<TFieldValues>

const toNestError = <TFieldValues,>(
  errors: Record<string, FieldError>,
  options: ResolverOptions<TFieldValues>
): FieldErrors<TFieldValues> => {
  const fieldErrors = {} as FieldErrors<TFieldValues>
  for (const path in errors) {
    const field = get(options.fields, path) as Field['_f'] | undefined

    set(
      fieldErrors,
      path,
      Object.assign(errors[path], { ref: field && field.ref })
    )
  }

  return fieldErrors
}

const parseSchemaErrors = (structError: StructError) => {
  const errors: Record<string, FieldError> = {}
  for (const error of structError.failures()) {
    const { type, refinement } = error
    const path = error.path.join('.')

    let message = error.message
    if (refinement === 'nonempty') {
      message = 'Required'
    } else if (refinement === 'email') {
      message = 'Invalid email'
    } else if (refinement === 'url') {
      message = 'Invalid url'
    } else if (refinement === 'twitter') {
      message = 'Invalid'
    } else if (refinement === 'pattern') {
      message = 'Invalid'
    }

    errors[path] = {
      type,
      message,
    }
  }

  return errors
}

export const resolver: Resolver = schema => (values, _, options) => {
  const [error, result] = validate(values, schema, { coerce: true })

  if (error) {
    return {
      values: {},
      errors: toNestError(parseSchemaErrors(error), options),
    }
  }

  return {
    values: result!,
    errors: {},
  }
}
