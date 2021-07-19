import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { styled } from 'stitches.config'

export const Content = styled(AlertDialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '$gray2',
  border: '1px solid $gray6',
  color: '$text',
  borderRadius: 8,
  boxShadow:
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  width: '100%',
  maxWidth: 448,
  padding: '$5 $4 $4',
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

export const Title = styled(AlertDialog.Title, {
  textAlign: 'center',
  color: '$gray12',
  marginBottom: '$3',
})

export const Description = styled(AlertDialog.Description, {
  textAlign: 'center',
  color: '$gray11',
  font: '$text',
})

export const Cancel = styled(AlertDialog.Cancel, {})

export const Action = styled(AlertDialog.Action, {})
