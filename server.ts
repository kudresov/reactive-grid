import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as netjet from 'netjet';
import * as exphbs from 'express-handlebars';
import { render } from './app';

const STATIC_RESOURCE_CACHE_PERIOD = '1y'; // 1 year

const app = express();
app.use(netjet());

// app.use(morgan);

const isProd = process.env.NODE_ENV === 'production';
const clientPath = isProd
  ? path.join(__dirname, 'public')
  : path.join(__dirname, 'dist', 'public');
const viewsPath = isProd
  ? path.join(__dirname, 'public', 'views')
  : path.join(__dirname, 'dist', 'public', 'views');
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('views', viewsPath);
app.set('view engine', '.hbs');

app.use(express.static(clientPath, { maxAge: STATIC_RESOURCE_CACHE_PERIOD }));

app.get('/', (req, res) => {
  const innerHtml = render('/');
  res.setHeader('Cache-Control', 'public, max-age=14400');
  res.render('index', { body: innerHtml });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
