import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Blog from './components/blog';
import About from './components/about';
import Projects from './components/contacts';
import Header from './components/header/header';
import routes from '../shared/routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import createReducer from './reducers';
import Home from './components/home';
import Footer from './components/footer/footer';
import GithubLoadable from './components/github/github-container';
import { SampleBlog } from './components/blog/sample-blog';
require('./reset.css');
require('./common.css');
// require('preact/debug');

const App = () => (
  <Switch>
    <div>
      <Header />
      <Route exact path={routes.home} component={Home} />
      <Route exact path={routes.blog} component={Blog}>
        {/* <Route path={routes.blogTestingReselect} component={TestingReselect} /> */}
      </Route>
      <Route path={routes.about} component={About} />
      <Route path={routes.projects} component={Projects} />
      <Route path={routes.github} component={GithubLoadable} />
      <Route path={routes.sampleBlog} component={SampleBlog} />
      <Footer />
    </div>
  </Switch>
);

export default App;
