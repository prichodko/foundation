import { styled, theme } from '~/styles/config'

const Text = styled('p', {
  fontFamily: theme.fonts.sans,
  lineHeight: 1.5,

  variants: {
    size: {
      12: { fontSize: theme.fontSizes[12] },
      14: { fontSize: theme.fontSizes[14] },
      16: { fontSize: theme.fontSizes[16] },
    },
    color: {
      primary: { color: theme.colors.gray12 },
      secondary: { color: theme.colors.gray11 },
    },
    weight: {
      400: { fontWeight: theme.fontWeights[400] },
      500: { fontWeight: theme.fontWeights[500] },
      600: { fontWeight: theme.fontWeights[600] },
    },
    align: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
    truncate: {
      true: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
        maxWidth: '100%',
      },
    },
  },

  defaultVariants: {
    size: '14',
    weight: '400',
    color: 'primary',
  },
})

export { Text }
