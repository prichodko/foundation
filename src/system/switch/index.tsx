import { ReactNode } from 'react'

import { Label, LabelProps } from '~/system/label'

import { Root, Thumb } from './style'

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
  required?: boolean
  disabled?: boolean
  children: ReactNode
}

const Switch = (props: Props) => {
  const { checked, onChange, required, disabled, children } = props

  return (
    <Label label={children}>
      <Root
        checked={checked}
        onCheckedChange={onChange}
        required={required}
        disabled={disabled}
      >
        <Thumb />
      </Root>
    </Label>
  )
}

export { Switch }
export type { Props as SwitchProps }
