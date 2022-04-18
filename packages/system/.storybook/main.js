const path = require('path')

module.exports = {
  features: {
    previewCsfV3: true,
  },
  reactOptions: {
    fastRefresh: true,
  },
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],

  webpackFinal: async config => ({
    ...config,
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, '..'), 'node_modules'],
      alias: {
        ...config.resolve.alias,
      },
    },
  }),
}
