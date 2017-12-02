import * as Loadable from 'react-loadable';
import * as React from 'react';

export const SampleBlogLoadable = Loadable({
  loader: () => import('./sample-blog' /* webpackChunkName: "blog" */),
  loading: () => <h1>Loading..</h1>
});