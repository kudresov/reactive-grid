import * as path from 'path';
const { PORT, NODE_ENV, GITHUB_API_TOKEN } = process.env;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const publicAssetsPath = IS_PRODUCTION
  ? path.join(__dirname, '../public')
  : path.join(__dirname, '../../dist');

const SERVER_RENDERER_PATH = IS_PRODUCTION
  ? path.join(__dirname, './server-renderer')
  : path.join(__dirname, '../../dist/server/server-renderer');

const config = {
  PORT: PORT ? parseInt(PORT) : 3000,
  STATIC_RESOURCE_CACHE_PERIOD: '1y',
  IS_PRODUCTION,
  GITHUB_API_TOKEN,
  SERVER_RENDERER_PATH,
  CLIENT_PATH: publicAssetsPath,
  CLIENT_STATS_PATH: path.join(__dirname, 'stats.json'),
};

export default config;
