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

interface DispatchProps {
  readonly getNext: (cursor: string) => void;
  readonly getPrevious: (cursor: string) => void;
}

interface Props {
  readonly after: string;
  readonly before: string;
}

interface GQLProps {
  readonly endCursor?: string;
  readonly startCursor?: string;
  readonly loading: boolean;
  readonly repos: Repo[];
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  readonly getNext: () => void;
  readonly getPrevious: () => void;
}

interface OwnProps {
  readonly reposCount: number;
}

const getRepos = (query: GetLastReposQuery): { name: string }[] => {
  if (!query.viewer) {
    return;
  }

  return query.viewer.repositories.edges.map(e => ({
    name: e.node.name
  }));
};

const GitHubContainer: React.SFC<
  OwnProps & GQLProps & Props & DispatchProps
> = props => {
  return <GitHubRepos {...props} />;
};

const repos = graphql<
  GetLastReposQuery,
  GetLastReposQueryVariables & OwnProps & Props & DispatchProps
>(REPO_QUERY, {
  options: ({ before, after, reposCount }) => ({
    variables: {
      last: before ? reposCount : undefined,
      first: before ? undefined : reposCount,
      before: before,
      after: after
    }
  }),
  props: ({
    data,
    ownProps: { before, after, getNext, getPrevious }
  }): GQLProps => {
    const defaults = {
      startCursor: undefined,
      endCursor: undefined,
      hasNextPage: false,
      hasPreviousPage: false
    };
    const { startCursor, endCursor, hasNextPage, hasPreviousPage } = data.viewer
      ? data.viewer.repositories.pageInfo
      : defaults;
    return {
      loading: data.loading,
      repos: getRepos(data),
      startCursor: startCursor,
      hasNext: hasNextPage,
      hasPrevious: hasPreviousPage,
      getNext: () => hasNextPage && getNext(endCursor),
      getPrevious: () => hasPreviousPage && getPrevious(startCursor)
    };
  }
});

const mapDispatchToProps = dispatch => ({
  getNext: cursor => dispatch(createGetNextRepos(cursor)),
  getPrevious: cursor => dispatch(createGetPreviousRepos(cursor))
});

const mapStateToProps = state => {
  const query = queryString.parse(state.routing.location.search);
  return {
    after: query.githubPageAfter,
    before: query.githubPageBefore
  };
};

export default connect<Props, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(repos(GitHubContainer));
