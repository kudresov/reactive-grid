import * as React from 'react';
import { gql, graphql } from 'react-apollo';
import Loader from '../../loader/loader';
import GitHubRepos from './github-repos';
import {
  GetLastReposQuery,
  GetLastReposQueryVariables
} from '../../../../../schema';
import { replace } from 'react-router-redux';
import routes from '../../../../shared/routes';
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { Repo } from '../../../../typings';
import {
  createGetNextRepos,
  createGetPreviousRepos
} from '../../../redux/actions/repos';

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
  readonly getNext: () => void;
  readonly getPrevious: () => void;
}

interface GQLProps {
  readonly before?: string;
  readonly after?: string;
  readonly endCursor?: string;
  readonly startCursor?: string;
  readonly loading: boolean;
  readonly repos: Repo[];
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
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

const getHasNextPage = (query: GetLastReposQuery) =>
  query.viewer ? query.viewer.repositories.pageInfo.hasNextPage : undefined;

const getHasPreviousPage = (query: GetLastReposQuery) =>
  query.viewer ? query.viewer.repositories.pageInfo.hasPreviousPage : undefined;

const GitHubContainer: React.SFC = props => {
  return <GitHubRepos {...props} />;
};

const repos = graphql<
  GetLastReposQuery,
  GetLastReposQueryVariables & OwnProps
>(REPO_QUERY, {
  options: ({ before, after, reposCount }) => ({
    variables: {
      last: before ? reposCount : undefined,
      first: before ? undefined : reposCount,
      before: before,
      after: after
    }
  }),
  props: ({ ownProps, data, ownProps: { before, after } }): GQLProps => ({
    loading: data.loading,
    repos: getRepos(data),
    endCursor: getEndCursor(data),
    startCursor: getStartCursor(data),
    hasNext: getHasNextPage(data),
    hasPrevious: getHasPreviousPage(data),
    before: data.viewer
      ? data.viewer.repositories.pageInfo.endCursor
      : undefined,
    after: data.viewer
      ? data.viewer.repositories.pageInfo.startCursor
      : undefined
  })
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getNext: () => dispatch(createGetNextRepos(ownProps.startCursor)),
  getPrevious: () => dispatch(createGetPreviousRepos(ownProps.endCursor))
});

export default repos(connect(undefined, mapDispatchToProps)(GitHubContainer));
