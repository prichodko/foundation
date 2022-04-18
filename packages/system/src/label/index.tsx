import { Text } from '../text'
import { Root } from './style'

import type { ReactNode } from 'react'

interface Props {
  label: React.ReactNode
  // htmlFor: string
  children?: ReactNode
  ariaLabel?: string
  className?: string
}

const Label = (props: Props) => {
  const { children, ariaLabel, label, className } = props

  if (!children && !ariaLabel) {
    console.warn(
      'If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility'
    )
  }

  return (
    <Root id="group" className={className}>
      {children}
      <Text size="12" className="ml-2">
        {label}
      </Text>
    </Root>
  )
}

export { Label }
export type { Props as LabelProps }
