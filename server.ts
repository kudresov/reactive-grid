import * as express from 'express';
import * as path from 'path';

const app = express();

app.use(express.static('dist'));
app.use(express.static('node_modules'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
