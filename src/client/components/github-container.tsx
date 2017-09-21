import * as Loadable from 'react-loadable';
import * as React from 'react';

declare let System: any;

const GithubLoadable = Loadable({
  loader: () => System.import('./github-page' /* webpackChunkName: "github" */),
  loading: () => <h1>Loading..</h1>
});

export default GithubLoadable;
