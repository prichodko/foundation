import { useState } from 'react'

import type { PopoverContentProps } from '@radix-ui/react-popover'
import { Root, Trigger } from '@radix-ui/react-popover'

import { Content } from './style'

interface TriggerProps {
  children: [
    React.ReactElement,
    React.ReactElement | ((close: VoidFunction) => React.ReactElement)
  ]
}

const PopoverTrigger = (props: TriggerProps) => {
  const { children } = props

  const [open, setOpen] = useState(false)

  const [trigger, content] = children

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>{trigger}</Trigger>
      {typeof content === 'function' ? content(() => setOpen(false)) : content}
    </Root>
  )
}

interface PopoverProps extends PopoverContentProps {}

const Popover = (props: PopoverProps) => {
  const { children, ...contentProps } = props

  const { sideOffset = 8 } = contentProps

  return (
    <Content sideOffset={sideOffset} {...contentProps}>
      {children}
    </Content>
  )
}

export { PopoverTrigger, Popover }
