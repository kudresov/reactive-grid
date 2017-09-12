import * as express from 'express';
import * as netjet from 'netjet';
import config from './config';

const serverRenderer = require(config.SERVER_RENDERER_PATH);
const clientStats = require(config.CLIENT_STATS_PATH);

const staticResource = express.static(config.CLIENT_PATH, {
  maxAge: config.STATIC_RESOURCE_CACHE_PERIOD
});

const app = express();

app.use(netjet());
app.use(staticResource);
app.use(serverRenderer({ clientStats }));

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
