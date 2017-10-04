import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Blog from './components/home';
import About from './components/about';
import Projects from './components/contacts';
import Header from './components/header';
import routes from '../shared/routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import GithubLoadable from './components/github-container';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import dynamicMiddlewares from './redux-dynamic-middlewares';
import createReducer from './reducers';

const store = createStore(createReducer(), applyMiddleware(dynamicMiddlewares));
(store as any).asyncReducers = {};

export const injectAsyncReducer = (name, asyncReducer) => {
  (store as any).asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer((store as any).asyncReducers));
};

const App = () => (
  <Provider store={store}>
    <Switch>
      <div>
        <Header />
        <hr />
        <Route path={routes.blog} component={Blog} />
        <Route path={routes.about} component={About} />
        <Route path={routes.projects} component={Projects} />
        <Route path={routes.github} component={GithubLoadable} />
      </div>
    </Switch>
  </Provider>
);

export default App;
