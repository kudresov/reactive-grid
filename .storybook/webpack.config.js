const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  const cssLoaderOptions = {
    sourceMap: true,
    modules: true,
    minimize: false,
    localIdentName: '[path][name]__[local]--[hash:base64:5]'
  };
  const cssLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: cssLoaderOptions
      }
    ]
  });

  config.module.rules = [];

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
  });

  config.module.rules.push({
    test: /\.css$/,
    loader: cssLoader
  });

  config.plugins.push(
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  );

  config.resolve.extensions.push('.ts', '.tsx', '.css');

  console.log(JSON.stringify(config, null, 2));
  return config;
};
