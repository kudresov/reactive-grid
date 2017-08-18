import * as express from 'express';
import * as path from 'path';

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const clientPath = isProd ? path.join(__dirname, 'public') : __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.static(clientPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});