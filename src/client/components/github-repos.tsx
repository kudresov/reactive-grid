import * as React from 'react';
import { gql, graphql } from 'react-apollo';
import { GetLastReposQuery, GetLastReposQueryVariables } from '../../../schema';
import Header from './header';
const styles = require('./github-section.css');

const REPO_QUERY = gql`
  query GetLastRepos($last: Int, $first: Int, $before: String, $after: String) {
    viewer {
      name
      repositories(last: $last, first: $first, before: $before, after: $after) {
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
    readonly cursor: string;
  }[];
  readonly endCursor: string;
  readonly startCursor: string;
  readonly hasOlderReposPage: boolean;
  readonly hasNewerRepoPage: boolean;
}

interface OwnProps {
  readonly getOlderRepos: (cursor: string) => void;
  readonly getNewerRepos: (cursor: string) => void;
  readonly before?: string;
  readonly after?: string;
  readonly reposCount: number;
}

const GitHub: React.SFC<Props & GetLastReposQueryVariables & OwnProps> = ({
  loading,
  repos,
  before,
  getOlderRepos,
  getNewerRepos,
  endCursor,
  startCursor,
  hasOlderReposPage,
  hasNewerRepoPage
}) => {
  if (loading) {
    return <h2>loading..</h2>;
  }
  return (
    <div>
      <div className={styles.headerContainer}>
        <img className={styles.icon} src="../../assets/repo.svg" />
        <h2 className={styles.header}>GitHub</h2>
      </div>
      <ul className={styles.list}>{repos.map(n => <li>{n.name}</li>)}</ul>
      {hasOlderReposPage && (
        <button
          onClick={() => {
            getOlderRepos(startCursor);
          }}
        >
          older
        </button>
      )}
      {hasNewerRepoPage && (
        <button onClick={() => getNewerRepos(endCursor)}>newer</button>
      )}
    </div>
  );
};

const repos = graphql<
  GetLastReposQuery,
  GetLastReposQueryVariables & OwnProps
>(REPO_QUERY, {
  options: props => {
    return {
      variables: {
        first: props.after ? props.reposCount : undefined,
        last: props.after ? undefined : props.reposCount,
        before: props.before,
        after: props.after
      }
    };
  },
  props: ({
    ownProps,
    data: { loading, viewer, error },
    ownProps: { before, after }
  }): Props & OwnProps => {
    return {
      loading,
      repos: viewer
        ? viewer.repositories.edges.map(e => ({
            name: e.node.name,
            cursor: e.cursor
          }))
        : [],
      reposCount: ownProps.reposCount,
      endCursor: viewer ? viewer.repositories.pageInfo.endCursor : undefined,
      startCursor: viewer
        ? viewer.repositories.pageInfo.startCursor
        : undefined,
      hasOlderReposPage: viewer
        ? viewer.repositories.pageInfo.hasPreviousPage
        : undefined,
      hasNewerRepoPage: viewer
        ? viewer.repositories.pageInfo.hasNextPage
        : undefined,
      getOlderRepos: ownProps.getOlderRepos,
      getNewerRepos: ownProps.getNewerRepos
    };
  }
});

export default repos(GitHub);
