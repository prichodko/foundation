import { DevTool } from '@hookform/devtools'
import type {
  SubmitHandler,
  SubmitErrorHandler,
  UseFormReturn,
  UnpackNestedValue,
  DefaultValues,
} from 'react-hook-form'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

type FormSubmitHandler<Values> = (
  defaultValues: UnpackNestedValue<Values>,
  form: UseFormReturn<Values>,
  event?: React.BaseSyntheticEvent
) => void | Promise<void>

interface Props<Values> {
  children: React.ReactNode
  onSubmit: FormSubmitHandler<Values>
  onError?: SubmitErrorHandler<Values>
  className?: string
  defaultValues: Required<DefaultValues<Values>>
}

const Form = <Values extends {}>(props: Props<Values>) => {
  const { children, onSubmit, onError, defaultValues, className } = props

  const form = useForm<Values>({
    defaultValues: defaultValues as DefaultValues<Values>,
  })

  const handleSubmit: SubmitHandler<Values> = (values, event) => {
    return onSubmit(values, form, event)
  }

  return (
    <FormProvider {...form}>
      <DevTool control={form.control} />

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
