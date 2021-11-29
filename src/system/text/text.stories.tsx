import React from 'react'

import type { Meta } from '@storybook/react'

import { styled } from '~/styles/config'

import { Text } from './'

export default {
  title: 'components/Text',
  component: Text,
} as Meta

const BackgroundWrap = styled('div', {
  backgroundColor: '$background',
  padding: '2rem',
})

export const Default = () => (
  <BackgroundWrap>
    <Text>Meow party!</Text>
  </BackgroundWrap>
)
