import { FormProvider, useForm, useFormContext } from 'react-hook-form'

import type {
  DefaultValues,
  SubmitErrorHandler,
  SubmitHandler,
  UnpackNestedValue,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

type FormSubmitHandler<Values> = (
  defaultValues: UnpackNestedValue<Values>,
  form: UseFormReturn<Values>,
  event?: React.BaseSyntheticEvent
) => any | Promise<any>

interface Props<Values> extends UseFormProps<Values> {
  children: React.ReactNode
  onSubmit: FormSubmitHandler<Values>
  onError?: SubmitErrorHandler<Values>
  className?: string
  defaultValues: DefaultValues<Values>
}

const Form = <Values extends {}>(props: Props<Values>) => {
  const { children, onSubmit, onError, defaultValues, className } = props

  const form = useForm<Values>({
    defaultValues,
  })

  const handleSubmit: SubmitHandler<Values> = (values, event) => {
    return onSubmit(values, form, event)
  }

  return (
    <FormProvider {...form}>
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
