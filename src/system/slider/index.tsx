// @ts-nocheck
import { useId } from '@radix-ui/react-id'

import type { FormFieldProps } from '~/system/form'
import { useField } from '~/system/form'

import { Root, Track, Range, Thumb } from './style'

interface Props extends FormFieldProps {
  min?: number
  max?: number
  step?: number
  value?: number[]
  onChange?: (value: number[]) => void
  required?: boolean
  disabled?: boolean
  label: string
}

const Slider = (props: Props) => {
  const { label, value, onChange, required } = props

  const switchId = useId()

  const { field, formState } = useField(props)

  const disabled = props.disabled || formState?.isSubmitting

  return (
    <Root aria-label={label}>
      <Track>
        <Range />
      </Track>
      <Thumb />
    </Root>
  )
}

export { Slider }
export type { Props as SliderProps }
