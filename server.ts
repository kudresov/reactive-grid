import * as express from 'express';
import * as path from 'path';

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
