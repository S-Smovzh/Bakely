import React from 'react';
import Helmet from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import path from 'path';
import App from '../web/App';

const app = express();

app.use(express.static(__dirname));

const statsFile = path.join(
  __dirname,
  '/loadable-stats.json'
);

function getHtml(helmetHtmlAttr, helmetTitle, helmetMeta, links, styles, html, scripts) {
  return `
    <!DOCTYPE html>
    <html ${helmetHtmlAttr}>
    <head>
        ${helmetTitle}
        ${helmetMeta}
        ${links}
        ${styles}
    </head>
    <body>
        <div id="root">${html}</div>
        ${scripts}
    </body>
    </html>
 `;
}

const context = {};

app.get('/*', (req, res) => {
  const chunkExtractor = new ChunkExtractor({ statsFile });

  // eslint-disable-next-line react/react-in-jsx-scope
  const jsx = chunkExtractor.collectChunks(<StaticRouter location={req.url} context={context}><App/></StaticRouter>);

  const stream = renderToNodeStream(jsx);

  const helmetData = Helmet.renderStatic();

  stream.on('end', () =>
    console.log(stream)
  );

  res.set('content-type', 'text/html');

  res.send(getHtml(
    helmetData?.htmlAttributes ? helmetData.htmlAttributes.toString() : '',
    helmetData.title.toString(),
    helmetData.meta.toString(),
    chunkExtractor.getLinkTags(),
    chunkExtractor.getStyleTags(),
    stream.toString(),
    chunkExtractor.getScriptTags()
  ));
});

app.listen((process.env.PORT || 3000), () => {
  console.log(`Server is listening on port ${(process.env.PORT || 3000)}`);
});
