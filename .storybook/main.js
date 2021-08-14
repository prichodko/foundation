const path = require('path')

module.exports = {
  features: {
    previewCsfV3: true,
  },
  reactOptions: {
    fastRefresh: true,
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
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
      alias: {
        ...config.resolve.alias,
        ...convertTsConfigPathsToWebpackAliases(),
      },
    },
  }),
}

function convertTsConfigPathsToWebpackAliases() {
  const rootDir = path.resolve(__dirname, '../')
  const tsconfig = require('../tsconfig.json')
  const tsconfigPaths = Object.entries(tsconfig.compilerOptions.paths)

  return tsconfigPaths.reduce((aliases, [realPath, mappedPath]) => {
    aliases[realPath] = path.join(rootDir, mappedPath[0])
    return aliases
  }, {})
}
