import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '../.env' });

const app = express();

const port = process.env.PORT || 4000;

console.log(port);

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.br';
  res.set('content-encoding', 'br');
  res.set('content-type', 'text/javascript');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url = req.url + '.br';
  res.set('content-encoding', 'br');
  res.set('content-type', 'text/css');
  next();
});

app.use(express.static(__dirname));

app.get('/*', (req, res) => {
  res.set('content-type', 'text/html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
