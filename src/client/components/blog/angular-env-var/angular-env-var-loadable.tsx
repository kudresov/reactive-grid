import * as Loadable from 'react-loadable';
import * as React from 'react';

export const AngularEnvVarLoadable = Loadable({
  loader: () => import('./angular-env-var' /* webpackChunkName: "blog" */),
  loading: () => <h1>Loading..</h1>
});