import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(__dirname));

app.get('/*', (req, res) => {
  res.set('content-type', 'text/html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen((process.env.PORT || 3000), () => {
  console.log(`Server is listening on port ${(process.env.PORT || 3000)}`);
});
