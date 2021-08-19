import { BaseButton } from '../base-button'

import { styled } from 'stitches.config'

export const Root = styled(BaseButton, {
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  padding: '8px 12px',
  borderWidth: 1,
  fontSize: '$small',
  fontWeight: '$400',
  transitionProperty: 'background-color, border-color, color, fill, stroke',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '150ms',
  outline: 'none',

  '&:focus': {
    ring: 2,
  },

  '&:disabled': {
    background: '$gray8',
    color: '$gray11',
    borderColor: '$gray6',

    '&:hover': {
      background: '$gray8',
      color: '$gray11',
      borderColor: '$gray6',
      cursor: 'not-allowed',
    },
  },

  variants: {
    variant: {
      default: {
        background: '$button-default-background',
        color: '$button-default-text',
        borderColor: '$button-default-border',

        '&:hover': {
          background: '$button-outline-background',
          color: '$button-outline-text',
        },
      },
      outline: {
        background: '$button-outline-background',
        color: '$button-outline-text',
        borderColor: '$button-outline-border',

        '&:hover': {
          background: '$button-default-background',
          color: '$button-default-text',
        },
      },
      minimal: {
        background: '$button-minimal-background',
        color: '$button-minimal-text',
        borderColor: '$button-minimal-border',

        '&:hover': {
          background: '$button-default-background',
          color: '$button-default-text',
        },
      },
      danger: {
        background: '$button-danger-background',
        color: '$button-danger-text',
        borderColor: '$button-danger-border',

        '&:hover': {
          background: '$button-danger-background-hover',
        },
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
