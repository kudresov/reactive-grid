import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config';
import config from './config';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import * as proxy from 'http-proxy-middleware';

const PORT = 5000;
const compiler = webpack(webpackConfig);
(compiler as any).apply(new FriendlyErrorsWebpackPlugin());

const apiProxy = proxy('/api', {
  target: 'http://localhost:' + config.PORT
});

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  serverSideRender: true,
  noInfo: true
});

const webpackHotMiddlewareInstance = webpackHotMiddleware(
  (compiler as any).compilers.find(compiler => compiler.name === 'client')
);

const app = express();
app.use(apiProxy);

app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);
app.use(webpackHotServerMiddleware(compiler, { chunkName: 'server' }));

app.listen(PORT, () => console.log(`listening on ${PORT}`));
