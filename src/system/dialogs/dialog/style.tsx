import * as Dialog from '@radix-ui/react-dialog'
import { styled } from 'stitches.config'

export const Content = styled(Dialog.Content, {
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
  maxWidth: 776,
})

export const Container = styled('div', {
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  paddingY: '$4',
  maxHeight: '70vh',
})

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$5',
  paddingX: '$3',

  '@sm': {
    paddingX: '$4',
  },
})

export const Body = styled('div', {
  flex: 1,
  padding: '$3',

  '@sm': {
    padding: '$4',
  },
})

export const Footer = styled('div', {
  flexShrink: 0,
  padding: '$4',
  display: 'grid',
  gridColumnGap: '$3',
  gridAutoFlow: 'column',
  justifyContent: 'flex-end',
  borderTop: '1px solid $gray6',
})

export const Close = styled(Dialog.Close, {
  display: 'inline-flex',
  borderRadius: 4,
  color: '$gray9',
  transition: '$colors',
  outline: 'none',

  '&:hover': {
    color: '$gray12',
  },

  '&:focus': {
    ring: 2,
  },
})

export const Title = styled(Dialog.Title, {
  color: '$text',
  fontSize: '1.2rem',
  fontWeight: '$600',
})

export const Description = styled(Dialog.Description, {})
