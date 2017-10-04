import createConfig from './create-config';
import * as path from 'path';

export default [
  createConfig({
    name: 'server',
    entry: './src/client/server-renderer.tsx',
    dist: path.join(__dirname, '../../dist/server'),
    node: true,
    sourceMap: 'inline-source-map'
  }),
  createConfig({
    name: 'client',
    entry: './src/client/index.tsx',
    codeSplitting: true,
    bootstrapChunk: true,
    longTermCachingChunk: true,
    sourceMap: 'inline-source-map',
    extractCss: true,
    stats: true
  })
];
