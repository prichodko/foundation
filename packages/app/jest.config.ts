import nextJest from 'next/jest'

// import { compilerOptions } from './tsconfig.json'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '~/(.*)$': ['<rootDir>/src/$1'],
  },
  testEnvironment: 'jest-environment-jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

export default createJestConfig(config)
