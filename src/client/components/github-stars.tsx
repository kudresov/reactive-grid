import * as React from 'react';
import { gql, graphql } from 'react-apollo';
import { StarredReposQuery, StarredReposQueryVariables } from '../../../schema';
const styles = require('./github-section.css');

const REPO_QUERY = gql`
  query StarredRepos($reposCount: Int) {
    viewer {
      starredRepositories(last: $reposCount) {
        nodes {
          name
        }
      }
    }
  }
`;

interface Props {
  readonly loading: boolean;
  readonly repos: {
    name: string;
  }[];
}

const GitHubStars: React.SFC<Props & StarredReposQueryVariables> = ({
  loading,
  repos
}) => {
  if (loading) {
    return <h2>loading..</h2>;
  }
  return (
    <div>
      <div className={styles.headerContainer}>
        <img className={styles.icon} src="../../assets/star.svg" />
        <h2 className={styles.header}>GitHub Stars</h2>
      </div>
      <ul className={styles.list}>{repos.map(n => <li>{n.name}</li>)}</ul>
    </div>
  );
};

const repos = graphql<StarredReposQuery, StarredReposQueryVariables>(
  REPO_QUERY,
  {
    props: ({ data: { loading, viewer, error } }): Props => ({
      loading,
      repos: viewer ? viewer.starredRepositories.nodes : []
    })
  }
);

export default repos(GitHubStars as any);
