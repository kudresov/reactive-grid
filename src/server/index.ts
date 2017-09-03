import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as netjet from 'netjet';
import * as exphbs from 'express-handlebars';
import { values } from 'ramda';
import routes from '../shared/routes';

const render = require('../../dist/server-renderer').render;

if (!render) {
  throw new Error('Render not found try compiling the server first');
}

const STATIC_RESOURCE_CACHE_PERIOD = '1y'; // 1 year

const app = express();
app.use(netjet());

const isProd = process.env.NODE_ENV === 'production';
const clientPath = path.join(__dirname, '../../dist');
const viewsPath = path.join(__dirname, '../../dist', 'views');
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('views', viewsPath);
app.set('view engine', '.hbs');

app.use(express.static(clientPath, { maxAge: STATIC_RESOURCE_CACHE_PERIOD }));

app.get(values(routes), (req, res) => {
  const innerHtml = render('/');
  // res.setHeader('Cache-Control', 'public, max-age=14400');
  res.render('index', { body: innerHtml });
  // res.send('hi!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
