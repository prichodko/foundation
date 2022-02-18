import { styled, theme } from '~/styles/config'

import { BaseButton } from '../base-button'

export const Root = styled(BaseButton, {
  fontSize: theme.fontSizes[12],
  fontWeight: theme.fontWeights[500],
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.radii.element,
  padding: '8px 12px',
  borderWidth: 1,
  transitionProperty: 'background-color, border-color, color, fill, stroke',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '150ms',

  '&:disabled': {
    background: theme.colors.gray8,
    color: theme.colors.gray11,
    borderColor: theme.colors.gray6,

    '&:hover': {
      background: theme.colors.gray8,
      color: theme.colors.gray11,
      borderColor: theme.colors.gray6,
      cursor: 'not-allowed',
    },
  },

  variants: {
    variant: {
      default: {
        background: theme.colors.gray12,
        color: theme.colors.gray1,
        borderColor: theme.colors.gray12,

        '&:hover': {
          background: theme.colors.gray1,
          color: theme.colors.gray12,
        },
      },
      outline: {
        background: theme.colors.gray1,
        color: theme.colors.gray12,
        borderColor: theme.colors.gray12,

        '&:hover': {
          background: theme.colors.gray12,
          color: theme.colors.gray1,
        },
      },
      minimal: {
        background: theme.colors.gray1,
        color: theme.colors.gray12,
        borderColor: theme.colors.transparent,

        '&:hover': {
          background: theme.colors.gray12,
          color: theme.colors.gray1,
        },
      },
      danger: {
        background: theme.colors.red9,
        color: theme.colors.gray1,
        borderColor: theme.colors.red9,

        '&:hover': {
          background: theme.colors.red10,
        },
      },
    },

    loading: {
      true: {
        paddingLeft: 32,
      },
    },

    width: {
      full: {
        width: '100%',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})
