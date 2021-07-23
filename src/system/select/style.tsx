import { styled } from 'stitches.config'

export const Trigger = styled('select', {
  display: 'block',
  width: '100%',
  paddingX: '12px',
  paddingY: '8px',
  fontSize: '$small',
  fontWeight: '$400',
  borderRadius: 4,
  border: '1px solid $gray7',
  outline: 'none',
  color: '$text',
  background: '$gray1',
  transition: '$colors',
  placeholder: '$gray9',

  '&:hover': {
    borderColor: '$gray8',
  },

  '&:focus': {
    borderColor: '$gray12',
  },

  "&[data-empty='true']": {
    color: '$gray9',

    "&[aria-invalid='true']": {
      color: '$red8',
    },
  },

  "&[aria-invalid='true']": {
    borderColor: '$red7',
    placeholder: '$red8',
    color: '$red11',

    '&:hover': {
      borderColor: '$red8',
    },

    '&:focus': {
      borderColor: '$red9',
    },
  },

  '&:disabled': {
    cursor: 'not-allowed',
    background: '$gray2',
    borderColor: '$gray6',
    placeholder: '$gray9',
  },
})
