import { cloneElement, useState } from 'react'

import { Root, Trigger } from '@radix-ui/react-dropdown-menu'
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons'

import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  RadioGroup,
  RadioItem,
  RightSlot,
  Separator,
  TriggerItem,
} from './style'

import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import type {
  MenuCheckboxItemProps,
  MenuItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
} from '@radix-ui/react-menu'
import type { ReactElement } from 'react'

interface Props {
  children: [ReactElement, ReactElement]
}

const MenuTrigger = (props: Props) => {
  const { children } = props

  const [open, setOpen] = useState(false)

  const [trigger, content] = children

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        {cloneElement(trigger, { onPress: () => setOpen(true) })}
      </Trigger>
      {content}
    </Root>
  )
}

interface MenuProps extends DropdownMenuContentProps {
  children: ReactElement[]
}

const Menu = (props: MenuProps) => {
  const { children, align = 'start', sideOffset = 6, ...menuProps } = props

  return (
    <Content align={align} sideOffset={sideOffset} {...menuProps}>
      {children}
    </Content>
  )
}

interface SubmenuProps extends MenuProps {
  label: string
}

const Submenu = (props: SubmenuProps) => {
  const { label, ...menuProps } = props

  return (
    <Root>
      <TriggerItem>
        {label}
        <RightSlot>
          <ChevronRightIcon />
        </RightSlot>
      </TriggerItem>
      <Menu sideOffset={10} {...menuProps} />
    </Root>
  )
}

interface ItemProps extends MenuItemProps {
  children: string
}

const MenuItem = (props: ItemProps) => {
  const { children, ...itemProps } = props

  return <Item {...itemProps}>{children}</Item>
}

interface CheckboxItemProps extends MenuCheckboxItemProps {
  children: string
}

const MenuCheckboxItem = (props: CheckboxItemProps) => {
  const { children, ...checkboxItemProps } = props

  return (
    <CheckboxItem {...checkboxItemProps}>
      {children}
      <ItemIndicator>
        <CheckIcon />
      </ItemIndicator>
    </CheckboxItem>
  )
}

interface RadioGroupProps extends MenuRadioGroupProps {
  children: ReactElement[]
}

const MenuRadioGroup = (props: RadioGroupProps) => {
  const { children, ...radioGroupProps } = props
  return <RadioGroup {...radioGroupProps}>{children}</RadioGroup>
}

interface RadioItemProps extends MenuRadioItemProps {
  children: string
}

const MenuRadioItem = (props: RadioItemProps) => {
  const { children, ...radioItemProps } = props

  return (
    <RadioItem {...radioItemProps}>
      {children}
      <ItemIndicator>
        <DotFilledIcon />
      </ItemIndicator>
    </RadioItem>
  )
}

Menu.Label = Label
Menu.Item = MenuItem
Menu.Group = Group
Menu.CheckboxItem = MenuCheckboxItem
Menu.RadioGroup = MenuRadioGroup
Menu.RadioItem = MenuRadioItem
Menu.Separator = Separator
Menu.Submenu = Submenu

export { Menu, MenuTrigger }
export type { Props as MenuProps }
