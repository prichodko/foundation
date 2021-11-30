const path = require('path')

module.exports = {
  features: {
    previewCsfV3: true,
  },
  reactOptions: {
    fastRefresh: true,
  },
  stories: ['../src'],
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
        ...convertTsConfigPathsToWebpackAliases(),
      },
    },
  }),
}

function convertTsConfigPathsToWebpackAliases() {
  const rootDir = path.resolve(__dirname, '../').replace('/*', '')
  const tsconfig = require('../tsconfig.json')
  const tsconfigPaths = Object.entries(tsconfig.compilerOptions.paths)

  return tsconfigPaths.reduce((aliases, [realPath, mappedPath]) => {
    const trimmedRealPath = realPath.replace('/*', '')
    const trimmedMappedPath = mappedPath[0].replace('/*', '')

    aliases[trimmedRealPath] = path.join(rootDir, trimmedMappedPath)
    return aliases
  }, {})
}
