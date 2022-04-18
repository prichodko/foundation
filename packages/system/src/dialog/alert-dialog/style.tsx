import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { styled, theme } from '../../config'

export const Content = styled(AlertDialog.Content, {
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
  maxWidth: 448,
  padding: '32px 24px 24px',
})

export const Container = styled('div', {
  marginBottom: '$3',

  '@sm': {
    marginBottom: '$5',
  },
})

export const Footer = styled('div', {
  flexShrink: 0,
  display: 'grid',
  gridColumnGap: '$3',
  gridAutoFlow: 'column',
})
