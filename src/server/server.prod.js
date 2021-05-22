import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';

// TODO: делать так, чтобы гзипнулись все файлы и сервер отдавал только гзип
//  (мб, просто сделать билд, а потом гзипнуть всё в дисте)

const app = express();

// app.use('/*', expressStaticGzip(path.join(__dirname), {}));

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

app.listen((process.env.PORT || 3000), () => {
  console.log(`Server is listening on port ${(process.env.PORT || 3000)}`);
});
