//metro.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

// const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
//     sourceExts: [...resolver.sourceExts, 'svg'],
//   };

//   return config;
// })();
