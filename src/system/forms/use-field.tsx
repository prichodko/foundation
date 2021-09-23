import type { UseControllerReturn, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'

interface Props {
  name?: string
  rules?: UseControllerProps['rules']
}

const useField = ({ name, rules }: Props): Partial<UseControllerReturn> => {
  if (!name) {
    return {}
  }
  return useController({ name, rules }) // eslint-disable-line react-hooks/rules-of-hooks
}

export { useField }
export type { Props as FormFieldProps }
