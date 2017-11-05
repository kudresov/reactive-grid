import * as React from 'react';
import { gql, graphql } from 'react-apollo';
import Loader from '../../loader/loader';
import GitHubRepos from './github-repos';
import {
  GetLastReposQuery,
  GetLastReposQueryVariables
} from '../../../../../schema';
import { compose } from 'redux';
import { replace } from 'react-router-redux';
import routes from '../../../../shared/routes';
import * as queryString from 'query-string';
import { connect } from 'react-redux';

const styles = require('../github-section.css');

const REPO_QUERY = gql`
  query GetLastRepos($last: Int, $first: Int, $before: String, $after: String) {
    viewer {
      name
      repositories(
        last: $last
        first: $first
        before: $before
        after: $after
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          cursor
          node {
            name
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

interface Props {
  readonly loading: boolean;
  readonly repos: {
    readonly name: string;
  }[];
  readonly endCursor: string;
  readonly startCursor: string;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}

interface GQProps {
  readonly getNext: () => void;
  readonly getPrevious: () => void;
  readonly before?: string;
  readonly after?: string;
}

interface OwnProps {
  readonly reposCount: number;
}

const getRepos = (query: GetLastReposQuery): { name: string }[] => {
  if (!query || !query.viewer) {
    return;
  }

  return query.viewer.repositories.edges.map(e => ({
    name: e.node.name
  }));
};

const getEndCursor = (query: GetLastReposQuery) =>
  query.viewer ? query.viewer.repositories.pageInfo.endCursor : undefined;

const getStartCursor = (query: GetLastReposQuery) =>
  query.viewer ? query.viewer.repositories.pageInfo.startCursor : undefined;

const GitHubContainer: React.SFC<
  Props & GetLastReposQueryVariables & GQProps & OwnProps
> = props => <GitHubRepos {...props} />;

const repos = graphql<
  GetLastReposQuery,
  GetLastReposQueryVariables & GQProps & OwnProps
>(REPO_QUERY, {
  options: props => {
    return {
      variables: {
        last: props.before ? props.reposCount : undefined,
        first: props.before ? undefined : props.reposCount,
        before: props.before,
        after: props.after
      }
    };
  },
  props: ({
    ownProps,
    data,
    ownProps: { before, after }
  }): Props & OwnProps => ({
    loading: data.loading,
    repos: getRepos(data),
    reposCount: ownProps.reposCount,
    endCursor: getEndCursor(data),
    startCursor: getStartCursor(data),
    hasNext: data.viewer
      ? data.viewer.repositories.pageInfo.hasNextPage
      : undefined,
    hasPrevious: data.viewer
      ? data.viewer.repositories.pageInfo.hasPreviousPage
      : undefined
  })
});

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

export default connect(undefined, mapDispatchToProps)(repos(GitHubContainer));
