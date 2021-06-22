/**
 * @type {import('next/dist/next-server/server/config-shared').NextConfig}
 */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: {
    // autoPrerender: false,
  },
  experimental: {
    // profiling: false,
    // reactMode: 'legacy',
    // stats: false,
  },
  future: {},
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)
