import type { PopoverContentProps } from '@radix-ui/react-popover'
import { Root, Trigger } from '@radix-ui/react-popover'

import { Content } from './style'

interface TriggerProps extends PopoverContentProps {
  trigger: React.ReactElement
  children: React.ReactNode
}

const Popover = (props: TriggerProps) => {
  const { trigger, children, ...contentProps } = props

  const { sideOffset = 8 } = contentProps

  return (
    <Root>
      <Trigger asChild>{trigger}</Trigger>
      <Content sideOffset={sideOffset} {...contentProps}>
        {children}
      </Content>
    </Root>
  )
}

export { Popover }
