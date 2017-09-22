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

const GitHubPage: React.SFC = () => (
  <ApolloProvider client={client}>
    <div>
      <GitHubStars reposCount={5} />
      <GitHubRepos reposCount={5} />
    </div>
  </ApolloProvider>
);

export default GitHubPage;
