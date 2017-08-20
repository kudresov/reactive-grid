import * as React from 'react';
import { StaticRouter } from 'react-router';
import * as ReactDOMServer from 'react-dom/server';
import App from './src/client/app';

export const render = (url: string) =>
  ReactDOMServer.renderToString(
    <StaticRouter location={url} context={{}}>
      <App />
    </StaticRouter>
  );
