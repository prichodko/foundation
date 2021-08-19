import * as MenuPrimitive from '@radix-ui/react-dropdown-menu'

import { styled } from 'stitches.config'

export const Content = styled(MenuPrimitive.Content, {
  background: '$gray2',
  border: '1px solid $gray6',
  color: '$text',
  padding: 5,
  minWidth: 130,
  borderRadius: 6,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
})

export const Group = styled(MenuPrimitive.Group, {})

export const Label = styled(MenuPrimitive.Label, {
  paddingLeft: 12,
  fontSize: 11,
  fontWeight: 600,
  lineHeight: '25px',
  color: '$gray8',
})

export const Item = styled(MenuPrimitive.Item, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  fontSize: '$small',
  padding: '8px 10px',
  borderRadius: 6,
  cursor: 'default',
  outline: 'none',

  '&:focus, &[aria-expanded="true"]': {
    backgroundColor: '$gray12',
    color: '$gray1',
  },

  '&[aria-disabled="true"]': {
    color: '$gray8',
    pointerEvents: 'none',
  },
})

export const TriggerItem = styled(MenuPrimitive.TriggerItem, {})

export const CheckboxItem = styled(MenuPrimitive.CheckboxItem, {})

export const RadioGroup = styled(MenuPrimitive.RadioGroup, {})

export const RadioItem = styled(MenuPrimitive.RadioItem, {})

export const ItemIndicator = styled(MenuPrimitive.ItemIndicator, {
  position: 'absolute',
  right: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Separator = styled(MenuPrimitive.Separator, {
  height: 1,
  backgroundColor: '$gray6',
  margin: 6,
})

export const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: '$gray8',
})
