import { styled, theme } from '~/styles/config'

export const Wrapper = styled('div', {
  position: 'relative',
})

export const Label = styled('label', {
  display: 'flex',
  fontSize: theme.fontSizes[10],
  fontWeight: theme.fontWeights[500],
  color: theme.colors.gray12,
  marginBottom: 2,
  userSelect: 'none',
  textTransform: 'uppercase',
})

export const Error = styled('span', {
  display: 'flex',
  fontSize: theme.fontSizes[10],
  fontWeight: theme.fontWeights[500],
  color: theme.colors.red11,
  marginTop: 4,
  marginLeft: 4,
  textTransform: 'uppercase',
})
