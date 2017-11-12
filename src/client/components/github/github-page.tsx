import * as React from 'react';
import { addMiddleware } from '../../redux-dynamic-middlewares';
import { injectAsyncReducer } from '../../router';
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import routes from '../../../shared/routes';
import { withRouter } from 'react-router-dom';
import GitHubStarsContainer from './github-repos-container';
import GitHubStarsStarsContainer from './github-stars-container';
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

interface Props {
  readonly location: any;
  readonly olderGithubRepo: (cursor: string) => void;
  readonly newerGithubRepo: (cursor: string) => void;
}

const GitHubPage: React.SFC<Props> = props => {
  return (
    <ApolloProvider client={client}>
      <div>
        <div className={styles.logoContainer}>
          <img src="../../assets/github-logo.svg" className={styles.logo} />
          <h1 className={styles.logoSubtitle}>Latest GitHub activity</h1>
        </div>
        <div className={styles.githubDetailsContainer}>
          <GitHubStarsContainer reposCount={5} />
          <GitHubStarsStarsContainer reposCount={5} />
        </div>
      </div>
    </ApolloProvider>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    olderGithubRepo: (cursor: string) => {
      dispatch(
        replace({
          pathname: routes.github,
          search: queryString.stringify({ githubPageAfter: cursor })
        })
      );
    },
    newerGithubRepo: (cursor: string) => {
      dispatch(
        replace({
          pathname: routes.github,
          search: queryString.stringify({ githubPageBefore: cursor })
        })
      );
    }
  };
};

export default connect(undefined, mapDispatchToProps)(GitHubPage);
