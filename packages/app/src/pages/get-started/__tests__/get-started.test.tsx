import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { GetStartedPage } from '../'

describe('Home', () => {
  it('renders a heading', () => {
    render(<GetStartedPage />)

    const heading = screen.getByRole('heading', {
      name: /Create Account/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
