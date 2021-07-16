import type { CheckboxOwnProps } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import { Label, LabelProps } from '~/system/label'

import { Root, Indicator } from './style'

interface Props extends LabelProps, CheckboxOwnProps {
  invalid?: boolean
  disabled?: boolean
  required?: boolean
}

export const Checkbox = (props: Props) => {
  const { children, disabled, invalid, ...checkboxProps } = props

  return (
    <Label label={children}>
      <Root {...checkboxProps} disabled={disabled} aria-invalid={invalid}>
        <Indicator>
          <CheckIcon />
        </Indicator>
      </Root>
    </Label>
  )
}

export type { Props as CheckboxProps }
