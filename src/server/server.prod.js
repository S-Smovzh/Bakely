import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(__dirname));

app.get('/*', (req, res) => {
  // req.url = req.url + '.gz';
  // res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen((process.env.PORT || 3000), () => {
  console.log(`Server is listening on port ${(process.env.PORT || 3000)}`);
});
