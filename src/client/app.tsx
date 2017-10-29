import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Blog from './components/blog';
import About from './components/about';
import Projects from './components/contacts';
import Header from './components/header';
import routes from '../shared/routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import GithubLoadable from './components/github-container';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import createReducer from './reducers';
import Home from './components/home/home';
import Footer from './components/footer';
require('./reset.css');
require('./common.css');

const App = () => (
  <Switch>
    <div>
      <Header />
      <Route exact path={routes.home} component={Home} />
      <Route path={routes.blog} component={Blog} />
      <Route path={routes.about} component={About} />
      <Route path={routes.projects} component={Projects} />
      <Route path={routes.github} component={GithubLoadable} />
      <Footer />
    </div>
  </Switch>
);

export default App;
