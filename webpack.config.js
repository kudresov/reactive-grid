const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/client/index.tsx',
  output: {
    filename: '[name].[hash].js',
    path: __dirname + '/dist/public'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'none', openAnalyzer: false }),
    new CopyWebpackPlugin([{ from: './index.html', to: './index.html' }])
  ],

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  }
};
