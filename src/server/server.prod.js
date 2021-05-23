const express = require('express');
const path = require('path');

// const __dirname = path.resolve();

const app = express();

const PORT = process.env.PORT || 3000;

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

try {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}, ${PORT} `);
  });
} catch (e) {
  console.log(e.stack);
}
