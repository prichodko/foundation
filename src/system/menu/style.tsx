import * as MenuPrimitive from '@radix-ui/react-dropdown-menu'

import { styled, theme } from '~/styles/config'

export const Content = styled(MenuPrimitive.Content, {
  background: theme.colors.gray2,
  border: `1px solid ${theme.colors.border}`,
  padding: 5,
  minWidth: 130,
  borderRadius: theme.radii.overlay,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
})

export const Group = styled(MenuPrimitive.Group, {})

export const Label = styled(MenuPrimitive.Label, {
  paddingLeft: 12,
  fontSize: theme.fontSizes[10],
  fontWeight: 600,
  lineHeight: '25px',
  color: theme.colors.gray10,
  textTransform: 'uppercase',
})

export const Item = styled(MenuPrimitive.Item, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.text,
  fontSize: theme.fontSizes[12],
  padding: '8px 10px',
  borderRadius: theme.radii.element,
  cursor: 'default',
  outline: 'none',

  '&:focus': {
    backgroundColor: theme.colors.gray12,
    color: theme.colors.gray1,
  },

  '&[aria-disabled="true"]': {
    color: theme.colors.gray9,
    pointerEvents: 'none',
  },
})

export const TriggerItem = styled(MenuPrimitive.TriggerItem, Item, {
  '&[aria-expanded="true"]': {
    backgroundColor: theme.colors.gray5,
    color: theme.colors.gray12,
  },
})

export const CheckboxItem = styled(MenuPrimitive.CheckboxItem, Item, {})

export const RadioGroup = styled(MenuPrimitive.RadioGroup, {})

export const RadioItem = styled(MenuPrimitive.RadioItem, Item, {})

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
  backgroundColor: theme.colors.gray6,
  margin: 6,
})

export const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
})
