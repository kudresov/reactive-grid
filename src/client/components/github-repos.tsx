import * as React from 'react';
import { gql, graphql } from 'react-apollo';
import { GetLastReposQuery, GetLastReposQueryVariables } from '../../../schema';
import Header from './header';
const styles = require('./github-section.css');

const REPO_QUERY = gql`
  query GetLastRepos($reposCount: Int) {
    viewer {
      name
      repositories(last: $reposCount) {
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
    readonly name: string;
  }[];
}

const GitHub: React.SFC<Props & GetLastReposQueryVariables> = ({
  loading,
  repos
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
    </div>
  );
};

const repos = graphql<GetLastReposQuery, GetLastReposQueryVariables>(
  REPO_QUERY,
  {
    options: ({ reposCount }) => ({
      variables: {
        reposCount
      }
    }),
    props: ({ data: { loading, viewer, error } }): Props => ({
      loading,
      repos: viewer ? viewer.repositories.nodes : []
    })
  }
);

export default repos(GitHub as any);
