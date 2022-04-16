import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  reporter: 'line',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    headless: true,
    // viewport: { width: 1280, height: 720 },
    // ignoreHTTPSErrors: true,
    // video: 'on-first-retry',
  },
}

export default config
