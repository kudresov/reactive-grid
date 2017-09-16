import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Blog from './components/home';
import About from './components/about';
import Projects from './components/contacts';
import Header from './components/header';
import GitHubPage from './components/github-page';
import routes from '../shared/routes';

import {
  ApolloClient,
  gql,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql'
});

const client = new ApolloClient({
  networkInterface
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }
      // get the authentication token from local storage if it exists
      const token = '';
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    }
  }
]);

const App = () => (
  <Switch>
    <ApolloProvider client={client}>
      <div>
        <Header />
        <hr />
        <Route path={routes.blog} component={Blog} />
        <Route path={routes.about} component={About} />
        <Route path={routes.projects} component={Projects} />
        <Route path={routes.github} component={GitHubPage} />
      </div>
    </ApolloProvider>
  </Switch>
);

export const foo = n => n + 'zap';
export default App;
