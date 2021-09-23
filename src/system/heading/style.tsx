import { styled, theme } from '~/styles/config'

export const Element = styled('h2', {
  fontFamily: theme.fonts.sans,
  lineHeight: 1.3,

  variants: {
    size: {
      24: { fontSize: theme.fontSizes[24] },
      32: { fontSize: theme.fontSizes[32] },
      48: { fontSize: theme.fontSizes[48] },
      64: { fontSize: theme.fontSizes[64] },
    },

    weight: {
      500: { fontWeight: theme.fontWeights[500] },
      600: { fontWeight: theme.fontWeights[600] },
    },

    align: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
  },

  defaultVariants: {
    size: '48',
    weight: '600',
  },
})
