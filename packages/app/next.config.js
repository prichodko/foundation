/**
 * @type {import('next/dist/server/config-shared').NextConfig}
 */

const config = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    dirs: ['pages', 'src'],
  },
  future: {},
  experimental: {
    externalDir: true,
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)
