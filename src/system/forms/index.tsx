import { BaseSyntheticEvent, ReactNode } from 'react'
import {
  useForm,
  FormProvider,
  UseFormProps,
  SubmitHandler,
  SubmitErrorHandler,
  useFormContext,
  useController,
  UseControllerReturn,
  UseControllerProps,
  UseFormReturn,
  UnpackNestedValue,
} from 'react-hook-form'

export type FormSubmitHandler<Values> = (
  values: UnpackNestedValue<Values>,
  form: UseFormReturn<Values>,
  event?: BaseSyntheticEvent
) => any | Promise<any>

interface Props<Values> extends Omit<UseFormProps<Values>, 'defaultValues'> {
  children: ReactNode
  values: Values
  onSubmit: FormSubmitHandler<Values>
  onError?: SubmitErrorHandler<Values>
  className?: string
}

const Form = <Values extends {}>(props: Props<Values>) => {
  const { children, onSubmit, onError, values, className } = props

  const form = useForm<Values>({
    defaultValues: values as UseFormProps<Values>['defaultValues'],
  })

  const handleSubmit: SubmitHandler<Values> = (values, event) => {
    onSubmit(values, form, event)
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

export interface FormFieldProps {
  name?: string
  rules?: UseControllerProps['rules']
}

const useField = ({
  name,
  rules,
}: FormFieldProps): Partial<UseControllerReturn> => {
  if (!name) {
    return {}
  }
  return useController({ name, rules }) // eslint-disable-line react-hooks/rules-of-hooks
}

const rules = {
  email: {},
}

export { Form, useFormContext, rules, useField }
export type { FormSubmitHandler as SubmitHandler }
