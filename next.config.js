/**
 * @type {import('next/dist/server/config-shared').NextConfig}
 */

const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    dirs: ['pages', 'src'],
  },
  // future: {},
  // experimental: {},
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)
