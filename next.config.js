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
  future: {
    strictPostcssConfiguration: true,
  },
  experimental: {},
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)
