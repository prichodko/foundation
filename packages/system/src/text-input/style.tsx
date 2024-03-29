import { styled, theme } from '../config'

export const Input = styled('input', {
  display: 'block',
  width: '100%',
  padding: '8px 12px',
  fontSize: theme.fontSizes[12],
  fontWeight: theme.fontWeights[400],
  borderRadius: theme.radii.element,
  color: theme.colors.text,
  background: theme.colors.gray1,
  border: `1px solid ${theme.colors.gray7}`,
  outline: 'none',
  // transition: '$colors',

  '&::placeholder': {
    color: theme.colors.gray9,
  },

  '&:hover': {
    borderColor: theme.colors.gray10,
  },

  '&:focus': {
    borderColor: theme.colors.gray12,
  },

  "&[aria-invalid='true']": {
    borderColor: theme.colors.red7,
    color: theme.colors.red11,

    '&::placeholder': {
      color: theme.colors.red8,
    },

    '&:hover': {
      borderColor: theme.colors.red8,
    },

    '&:focus': {
      borderColor: theme.colors.red9,
    },
  },

  '&:disabled': {
    cursor: 'not-allowed',
    background: theme.colors.gray2,
    borderColor: theme.colors.gray6,

    '&::placeholder': {
      color: theme.colors.gray9,
    },
  },
})
