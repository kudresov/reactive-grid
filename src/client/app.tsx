import * as React from 'react';
import About from './components/about';
import Blog from './components/blog';
import createReducer from './reducers';
import Footer from './components/footer/footer';
import GithubLoadable from './components/github/github-container';
import Header from './components/header/header';
import Home from './components/home';
import Projects from './components/contacts';
import routes from '../shared/routes';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { SampleBlogLoadable } from './components/blog/sample-blog/sample-blog-loadable';
import { AngularEnvVarLoadable } from './components/blog/angular-env-var/angular-env-var-loadable';

require('./reset.css');
require('./common.css');
// require('preact/debug');

const App = () => (
  <Switch>
    <div>
      <Header />
      <Route exact path={routes.home} component={Home} />
      <Route exact path={routes.blog} component={Blog} />

      {/* <Route path={routes.blogTestingReselect} component={TestingReselect} /> */}
      <Route exact path={routes.sampleBlog} component={SampleBlogLoadable} />
      <Route
        exact
        path={routes.angularEnvBlog}
        component={AngularEnvVarLoadable}
      />
      <Route path={routes.about} component={About} />
      <Route path={routes.projects} component={Projects} />
      <Route path={routes.github} component={GithubLoadable} />
      <Footer />
    </div>
  </Switch>
);

export default App;
