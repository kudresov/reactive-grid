import * as path from 'path';
const { PORT, NODE_ENV, GITHUB_API_TOKEN } = process.env;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const publicAssetsPath = IS_PRODUCTION
  ? path.join(__dirname, '../public')
  : path.join(__dirname, '../../dist/public');

const SERVER_PATH = IS_PRODUCTION
  ? path.join(__dirname)
  : path.join(__dirname, '../../dist/server');

const config = {
  PORT: PORT ? parseInt(PORT) : 3000,
  STATIC_RESOURCE_CACHE_PERIOD: '1y',
  IS_PRODUCTION,
  GITHUB_API_TOKEN,
  SERVER_RENDERER_PATH: path.join(SERVER_PATH, 'server-renderer'),
  CLIENT_PATH: publicAssetsPath,
  CLIENT_STATS_PATH: path.join(SERVER_PATH, 'stats.json'),
};

export default config;
