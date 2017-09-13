import createConfig from './create-config';
import * as path from 'path';

export default [
  createConfig({
    name: 'client',
    entry: './src/client/index.tsx',
    codeSplitting: true,
    bootstrapChunk: true,
    longTermCachingChunk: true,
    sourceMap: 'eval',
    extractCss: true,
    stats: true,
  }),
  createConfig({
    name: 'server-renderer',
    entry: './src/client/server-renderer.tsx',
    dist: path.join(__dirname, '../../dist/server'),
    node: true,
    sourceMap: 'eval',
  }),
];
