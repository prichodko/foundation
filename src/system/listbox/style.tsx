import { styled, theme } from '~/styles/config'

export const Listbox = styled('div', {
  background: theme.colors.gray2,
  border: `1px solid ${theme.colors.border}`,
  padding: 5,
  minWidth: 130,
  borderRadius: theme.radii.overlay,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
})

export const Item = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.text,
  fontSize: theme.fontSizes[12],
  padding: '8px 10px',
  borderRadius: theme.radii.element,
  cursor: 'default',
  outline: 'none',

  '&:focus, &[data-focused="true"]': {
    backgroundColor: theme.colors.gray12,
    color: theme.colors.gray1,
  },

  '&[aria-disabled="true"]': {
    color: theme.colors.gray9,
    pointerEvents: 'none',
  },
})
