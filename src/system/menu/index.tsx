import { Root, Trigger } from '@radix-ui/react-dropdown-menu'
import type { DropdownMenuContentOwnProps } from '@radix-ui/react-dropdown-menu'
import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import type {
  MenuItemOwnProps,
  MenuRadioItemOwnProps,
  MenuRadioGroupOwnProps,
  MenuCheckboxItemOwnProps,
} from '@radix-ui/react-menu'
import { Slot } from '@radix-ui/react-slot'
import { cloneElement, ReactElement, useState } from 'react'

import {
  Content,
  Group,
  Label,
  Item,
  TriggerItem,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Separator,
  RightSlot,
} from './style'

interface Props {
  children: [ReactElement, ReactElement]
}

const MenuTrigger = (props: Props) => {
  const { children } = props

  const [open, setOpen] = useState(false)

  const [trigger, content] = children

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger as={Slot}>
        {cloneElement(trigger, { onPress: () => setOpen(true) })}
      </Trigger>
      {content}
    </Root>
  )
}

interface MenuProps extends DropdownMenuContentOwnProps {
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
      <Item as={TriggerItem}>
        {label}
        <RightSlot>
          <ChevronRightIcon />
        </RightSlot>
      </Item>
      <Menu sideOffset={10} {...menuProps} />
    </Root>
  )
}

interface MenuItemProps extends MenuItemOwnProps {
  children: string
}

const MenuItem = (props: MenuItemProps) => {
  const { children, ...itemProps } = props

  return <Item {...itemProps}>{children}</Item>
}

interface CheckboxItemProps extends MenuCheckboxItemOwnProps {
  children: string
}

const MenuCheckboxItem = (props: CheckboxItemProps) => {
  const { children, ...checkboxItemProps } = props

  return (
    <Item as={CheckboxItem} {...checkboxItemProps}>
      {children}
      <ItemIndicator>
        <CheckIcon />
      </ItemIndicator>
    </Item>
  )
}

interface RadioGroupProps extends MenuRadioGroupOwnProps {
  children: ReactElement[]
}

const MenuRadioGroup = (props: RadioGroupProps) => {
  const { children, ...radioGroupProps } = props
  return <RadioGroup {...radioGroupProps}>{children}</RadioGroup>
}

interface RadioItemProps extends MenuRadioItemOwnProps {
  children: string
}

const MenuRadioItem = (props: RadioItemProps) => {
  const { children, ...radioItemProps } = props

  return (
    <Item as={RadioItem} {...radioItemProps}>
      {children}
      <ItemIndicator>
        <DotFilledIcon />
      </ItemIndicator>
    </Item>
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

export { MenuTrigger, Menu }
export type { Props as MenuProps }
