import * as React from 'react';
import { StaticRouter } from 'react-router';
import * as ReactDOMServer from 'react-dom/server';
import App from './app';
import { pipe, compose, filter } from 'ramda';

export const render = (url: string) =>
  ReactDOMServer.renderToString(
    <StaticRouter location={url} context={{}}>
      <App />
    </StaticRouter>
  );

const convertToScriptTags = (scripts: string[]) =>
  scripts
    .map(s => `<script type="text/javascript" src="${s}"></script>`)
    .join('\n');

const convertToCssTags = (css: string[]) =>
  css.map(c => `<link href="${c}" rel="stylesheet">`).join('\n');

const toArray = (item: string[] | string) =>
  Array.isArray(item) ? item : [item];

const jsFilter = fs => fs.filter(f => f.endsWith('.js'));
const cssFilter = fs => fs.filter(f => f.endsWith('.css'));
const toScriptTag = compose(convertToScriptTags, jsFilter, toArray);
const toCssTag = compose(convertToCssTags, cssFilter, toArray);

module.exports = function serverRenderer({ clientStats, serverStats }) {
  return (req, res) => {
    const bootstrapScript = toScriptTag(
      clientStats.assetsByChunkName.bootstrap
    );
    const libScripts = toScriptTag(
      clientStats.assetsByChunkName['long-term-caching']
    );
    const jsScripts = toScriptTag(clientStats.assetsByChunkName.client);
    const cssTags = toCssTag(clientStats.assetsByChunkName.client);

    res.send(`
      <!DOCTYPE html>
      <html lang="en" style="height: 100%">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <base href="/">
        <title>Reactive Grid</title>
        ${cssTags}
      </head>
      
      <body style="background-image: linear-gradient(0deg, #CFD9DF 0%, #E2EBF0 100%); min-height: 100%">
        <div id="app">
          ${render(req.url)}
        </div>
        ${bootstrapScript}
        ${libScripts}
        ${jsScripts}
      </body>
      </html>
      `);
  };
};
