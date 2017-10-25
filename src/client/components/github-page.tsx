import * as React from 'react';
import GitHubStars from './github-stars';
import GitHubRepos from './github-repos';
import { addMiddleware } from '../redux-dynamic-middlewares';
import { injectAsyncReducer } from '../app';
const styles = require('./github-page.css');

import {
  ApolloClient,
  gql,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
const networkInterface = createNetworkInterface({
  uri: '/api/github/graphql'
});

const client = new ApolloClient({
  networkInterface
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      next();
    }
  }
]);

addMiddleware(client.middleware());
injectAsyncReducer('apollo', client.reducer());

const GitHubPage: React.SFC = () => (
  <ApolloProvider client={client}>
    <div>
      <div className={styles.logoContainer}>
        <img src="../../assets/github-logo.svg" className={styles.logo} />
        <h1 className={styles.logoSubtitle}>Latest GitHub activity</h1>
      </div>
      <div className={styles.githubDetailsContainer}>
        <GitHubStars reposCount={5} />
        <GitHubRepos reposCount={5} />
      </div>
    </div>
  </ApolloProvider>
);

export default GitHubPage;
