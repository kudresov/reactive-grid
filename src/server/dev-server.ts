import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackConfig from '../../webpack.config.js';
import config from './config';

const compiler = webpack(webpackConfig);
const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  serverSideRender: true
});
const webpackHotMiddlewareInstance = webpackHotMiddleware(
  compiler.compilers.find(compiler => compiler.name === 'client')
);

const app = express();

app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);
app.use(webpackHotServerMiddleware(compiler));

app.listen(config.PORT, () => console.log(`listening on ${config.PORT}`));
