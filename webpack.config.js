const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    entry: './src/client/index.tsx',
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: __dirname + '/dist',
      publicPath: '/'
    },
    // devServer: {
    //   contentBase: path.join(__dirname, 'dist'),
    //   compress: false,
    //   port: 9000,
    //   stats: 'errors-only',
    //   proxy: {
    //     '/': {
    //       target: 'http://localhost:3000',
    //       bypass: function(req, res, proxyOptions) {
    //         return req.path.includes('.js');
    //       }
    //     }
    //   }
    // },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'commons' }),
      // new webpack.optimize.UglifyJsPlugin({
      //   mangle: true,
      //   compress: {
      //     warnings: false, // Suppress uglification warnings
      //     pure_getters: true,
      //     unsafe: true,
      //     unsafe_comps: true,
      //     screw_ie8: true
      //   },
      //   output: {
      //     comments: false
      //   },
      //   exclude: [/\.min\.js$/gi] // skip pre-minified libs
      // }),
      new BundleAnalyzerPlugin({ analyzerMode: 'none', openAnalyzer: false }),
      new CopyWebpackPlugin([{ from: './favicon.ico', to: './favicon.ico' }]),
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        filename: 'views/index.hbs'
      }),
      new ExtractTextPlugin('styles.css')
    ],

    // Enable sourcemaps for debugging webpack's output.
    // devtool: 'source-map',
    devtool: 'eval',
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
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
          loaders: ['awesome-typescript-loader'],
          exclude: [/node_modules/, './src/server']
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          })
        },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
      ]
    }
  },
  {
    entry: './src/client/server-renderer.tsx',
    externals: [nodeExternals()],
    devtool: 'eval',
    output: {
      filename: 'server-renderer.js',
      path: __dirname + '/dist',
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },
    watchOptions: {
      ignored: './ser/server/*'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: false,
      port: 9000,
      stats: 'errors-only'
    },
    target: 'node',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('styles.css')
    ],

    // Enable sourcemaps for debugging webpack's output.
    // devtool: 'source-map',
    // devtool: 'eval',
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
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
          loaders: ['awesome-typescript-loader'],
          exclude: [/node_modules/, './src/server']
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          })
        }

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
      ]
    }
  }
];
