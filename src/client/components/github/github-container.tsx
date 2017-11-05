import * as Loadable from 'react-loadable';
import * as React from 'react';

const GithubLoadable = Loadable({
  loader: () => import('./github-page' /* webpackChunkName: "github" */),
  loading: () => <h1>Loading..</h1>
});

export default GithubLoadable;
