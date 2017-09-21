import * as React from 'react';
import GitHubStars from './github-stars';
import GitHubRepos from './github-repos';

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

const GitHubPage: React.SFC = () => (
  <ApolloProvider client={client}>
    <div>
      <GitHubStars reposCount={5} />
      <GitHubRepos reposCount={5} />
    </div>
  </ApolloProvider>
);

export default GitHubPage;
