const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './server.ts',
  output: {
    filename: 'server.js',
    path: __dirname + '/dist'
  },
  devtool: 'eval',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
    modules: ['node_modules'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      handlebars: 'handlebars/dist/handlebars.js'
    }
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/]
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
  },
  plugins: [new ExtractTextPlugin('styles.css')]
};
