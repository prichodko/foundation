import { DevTool } from '@hookform/devtools'
import { useForm, FormProvider } from 'react-hook-form'
import type {
  SubmitHandler,
  SubmitErrorHandler,
  UseFormReturn,
  UnpackNestedValue,
  DefaultValues,
  useFormContext,
  Mode,
} from 'react-hook-form'
import type { Struct } from 'superstruct'

import { resolver } from './resolver'

interface Props<Values> {
  children: React.ReactNode
  onSubmit: FormSubmitHandler<Values>
  onError?: SubmitErrorHandler<Values>
  className?: string
  defaultValues: Required<DefaultValues<Values>>
  schema: Struct<Values>
  mode?: Mode
}

const Form = <Values extends {}>(props: Props<Values>) => {
  const {
    children,
    onSubmit,
    onError,
    defaultValues,
    className,
    schema,
    mode = 'onTouched',
  } = props

  const form = useForm<Values>({
    defaultValues: defaultValues as DefaultValues<Values>,
    resolver: resolver(schema),
    mode,
  })

  const handleSubmit: SubmitHandler<Values> = (values, event) => {
    return onSubmit(values, form, event)
  }

  return (
    <FormProvider {...form}>
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={form.control} />
      )}

      <form
        onSubmit={form.handleSubmit(handleSubmit, onError)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  )
}

type FormSubmitHandler<Values> = (
  defaultValues: UnpackNestedValue<Values>,
  form: UseFormReturn<Values>,
  event?: React.BaseSyntheticEvent
) => void | Promise<void>

export { Form, useFormContext }
export type { Props as FormProps, FormSubmitHandler }
