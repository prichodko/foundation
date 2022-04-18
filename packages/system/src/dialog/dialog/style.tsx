import * as Dialog from '@radix-ui/react-dialog'

import { styled, theme } from '../../config'

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: theme.colors.backgroundOverlay,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.overlay,
  boxShadow:
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  width: '100%',
  maxWidth: 776,
})

export const Container = styled('div', {
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  padding: '24px 0',
  maxHeight: '70vh',
})

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$5',
  padding: '0 16px',

  '@sm': {
    padding: '0 24px',
  },
})

export const Body = styled('div', {
  flex: 1,
  padding: '16px',

  '@sm': {
    padding: '24px',
  },
})

export const Footer = styled('div', {
  flexShrink: 0,
  padding: '24px',
  display: 'grid',
  gridColumnGap: '16px',
  gridAutoFlow: 'column',
  justifyContent: 'flex-end',
  borderTop: `1px solid ${theme.colors.border}`,
})

export const Close = styled(Dialog.Close, {
  display: 'inline-flex',
  borderRadius: theme.radii.element,
  color: theme.colors.gray9,
  // transition: '$colors',

  '&:hover': {
    color: theme.colors.gray12,
  },
})
