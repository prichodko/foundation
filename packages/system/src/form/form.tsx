import { superstructResolver } from '@hookform/resolvers/superstruct'
import { FormProvider, useForm } from 'react-hook-form'

// import { DevTool } from '@hookform/devtools'
import type {
  DefaultValues,
  Mode,
  SubmitErrorHandler,
  SubmitHandler,
  UnpackNestedValue,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form'
import type { Struct } from 'superstruct'

interface Props<Values> {
  children: React.ReactNode
  onSubmit: FormSubmitHandler<Values>
  onError?: SubmitErrorHandler<Values>
  className?: string
  defaultValues: Required<DefaultValues<Values>>
  schema: Struct<Values>
  mode?: Mode
}

type FormSubmitHandler<Values> = (
  defaultValues: UnpackNestedValue<Values>,
  form: UseFormReturn<Values>,
  event?: React.BaseSyntheticEvent
) => void | Promise<void>

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
    resolver: superstructResolver(schema),
    mode,
  })

  const handleSubmit: SubmitHandler<Values> = (values, event) => {
    return onSubmit(values, form, event)
  }

  return (
    <FormProvider {...form}>
      {/* {process.env.NODE_ENV === 'development' && (
        <DevTool control={form.control} />
      )} */}

      <form
        onSubmit={form.handleSubmit(handleSubmit, onError)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export { Form, useFormContext }
export type { Props as FormProps, FormSubmitHandler }
