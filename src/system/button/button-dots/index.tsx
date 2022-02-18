import type { Ref } from 'react'
import { forwardRef } from 'react'

import { DotsVerticalIcon } from '@radix-ui/react-icons'

import type { VariantProps } from '~/styles/config'

import { Root } from './style'

interface Props {
  variant?: VariantProps<typeof Root>['variant']
  width?: VariantProps<typeof Root>['width']
}

const Button = (props: Props, ref: Ref<HTMLButtonElement>) => {
  return (
    <Root {...props} ref={ref}>
      <DotsVerticalIcon />
    </Root>
  )
}

const _Button = forwardRef(Button)

export { _Button as Button }
export type { Props as ButtonProps }
