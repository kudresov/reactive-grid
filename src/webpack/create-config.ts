import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as fs from 'fs';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as StatsPlugin from 'stats-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

const SRC_DIR = path.join(__dirname, '../');
const DIST_DIR = path.join(__dirname, '../../dist/public');
const PUBLIC_PATH = '/public/';

export interface Options {
  readonly name: string;
  readonly entry: string;
  readonly node?: boolean;
  readonly codeSplitting?: boolean;
  readonly bootstrapChunk?: boolean;
  readonly longTermCachingChunk?: boolean;
  readonly revision?: boolean;
  readonly sourceMap?: webpack.Options.Devtool;
  readonly sourceMapPath?: string;
  readonly optimize?: boolean;
  readonly extractCss?: boolean;
  readonly bundleAnalyzer?: boolean;
  readonly stats?: boolean;
  readonly dist?: string;
}

const defaultOptions: Partial<Options> = {
  codeSplitting: false,
  revision: false,
  optimize: false,
  node: false,
  sourceMap: false,
  extractCss: false,
  bundleAnalyzer: false,
  stats: false,
  dist: DIST_DIR
};

const getEntry = (options: Options): webpack.Entry => {
  const entry: webpack.Entry = {
    [options.name]: options.entry
  };

  if (options.longTermCachingChunk) {
    entry['long-term-caching'] = ['react', 'react-dom', 'react-router'];
  }

  return entry;
};

const getOutput = (options: Options): webpack.Output => {
  const filename = options.revision ? '[name].[chunkhash].js' : '[name].js';

  const output: webpack.Output = {
    path: options.dist,
    filename,
    chunkFilename: filename,
    publicPath: PUBLIC_PATH
  };

  if (options.node) {
    output.libraryTarget = 'commonjs2';
  }

  if (options.sourceMapPath) {
    output.sourceMapFilename = path.join(
      options.sourceMapPath,
      `${filename}.map`
    );
  }

  return output;
};

const getPlugins = (options: Options): webpack.Plugin[] => {
  const plugins: webpack.Plugin[] = [
    new ExtractTextPlugin({
      filename: options.revision ? '[name].[contenthash].css' : '[name].css',
      allChunks: true,
      disable: !options.extractCss
    })
  ];

  if (options.optimize) {
    plugins.push(
      new webpack.DefinePlugin({
        // Put React in prod mode.
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    );
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: !!options.sourceMap
      })
    );
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  }

  if (!options.codeSplitting) {
    plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    );
  }

  if (options.longTermCachingChunk) {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'long-term-caching',
        minChunks: Infinity
      })
    );
  }

  if (options.bootstrapChunk) {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'bootstrap',
        minChunks: Infinity
      })
    );
  }

  if (options.stats) {
    plugins.push(new StatsWriterPlugin());
  }

  if (options.bundleAnalyzer) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'stats.html',
        openAnalyzer: false
      })
    );
  }

  return plugins;
};

const getRules = (options: Options): webpack.Rule[] => {
  let cssLoader;
  const cssLoaderOptions = {
    sourceMap: !!options.sourceMap,
    modules: true,
    minimize: options.optimize,
    localIdentName: '[path][name]__[local]--[hash:base64:5]'
  };

  if (options.node) {
    cssLoader = [
      {
        loader: 'css-loader',
        options: cssLoaderOptions
      }
    ];
  } else {
    cssLoader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: cssLoaderOptions
        }
      ]
    });
  }

  return [
    {
      test: /\.tsx?$/,
      include: SRC_DIR,
      loader: 'awesome-typescript-loader'
    },
    {
      test: /\.json$/,
      include: SRC_DIR,
      loader: 'json-loader'
    },
    {
      test: /\.css$/,
      loader: cssLoader
    },
    {
      test: /\.(png|jpg|woff|svg|eot|ttf|gif)$/,
      loader: 'file-loader'
    }
  ];
};

const createConfig = (options: Options): webpack.Configuration => {
  options = {
    ...defaultOptions,
    ...options
  };

  return {
    name: options.name,
    entry: getEntry(options),
    output: getOutput(options),
    target: options.node ? 'node' : 'web',
    devtool: options.sourceMap,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      enforceExtension: false,
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
    },
    module: {
      rules: getRules(options)
    },
    plugins: getPlugins(options),
    externals: [nodeExternals()]
  };
};

export default createConfig;
