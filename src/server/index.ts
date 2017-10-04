import * as express from 'express';
import * as netjet from 'netjet';
import * as proxy from 'http-proxy-middleware';
import config from './config';
import * as morgan from 'morgan';

const serverRenderer = require(config.SERVER_RENDERER_PATH);
const clientStats = require(config.CLIENT_STATS_PATH);

const staticResource = express.static(config.CLIENT_PATH, {
  maxAge: config.STATIC_RESOURCE_CACHE_PERIOD
});

const githubApi = proxy('/api/github/graphql', {
  target: 'https://api.github.com',
  changeOrigin: true,
  headers: {
    Authorization: `Bearer ${config.GITHUB_API_TOKEN}`
  },
  logLevel: 'debug',
  secure: false,
  pathRewrite: {
    '^/api/github/graphql': '/graphql'
  }
});

const app = express();

app.use(morgan('combined'));

app.use(netjet());
app.use(staticResource);
app.use(githubApi);
app.use(serverRenderer({ clientStats }));

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
