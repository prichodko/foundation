import { test, expect } from '@playwright/test'
// import type { Page } from '@playwright/test'

// const indexPage = (page: Page) => ({})

test.describe('Login page', () => {
  test('should succesfully log in', async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto('/')
    // Click text=Sign In
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/login' }*/),
      page.click('text=Sign In'),
    ])
    // Click [placeholder="Email"]
    await page.click('[placeholder="Email"]')
    // Fill [placeholder="Email"]
    await page.fill('[placeholder="Email"]', 'test@foundation.com')
    // Press Tab
    await page.press('[placeholder="Email"]', 'Tab')
    // Fill [placeholder="Password"]
    await page.fill('[placeholder="Password"]', 'laskdjfdklsjfadklsjf')
    // Click text=Log In
    await page.click('button:has-text("Log In")')

    expect(await page.isDisabled('[placeholder="Email"]')).toBeTruthy()
    expect(await page.isDisabled('[placeholder="Password"]')).toBeTruthy()

    await page.screenshot({ path: 'screenshot.png' })
  })

  test('should show email error', async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto('/')
    // Click text=Sign In
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/login' }*/),
      page.click('text=Sign In'),
    ])

    await page.click('button:has-text("Log In")')

    expect(
      await page.getAttribute('[name="email"]', 'aria-invalid')
    ).toBeTruthy()
    expect(
      await page.getAttribute('[name="password"]', 'aria-invalid')
    ).toBeTruthy()
  })
})
