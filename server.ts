import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as netjet from 'netjet';

const app = express();
app.use(netjet());
// app.use(morgan);

const isProd = process.env.NODE_ENV === 'production';
const clientPath = isProd ? path.join(__dirname, 'public') : __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.static(clientPath, {maxAge: 3600000}));

app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
