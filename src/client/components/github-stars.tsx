import * as React from 'react';
import { gql, graphql } from 'react-apollo';
import { StarredReposQuery, StarredReposQueryVariables } from '../../../schema';

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
    return <h1>loading..</h1>;
  }
  return (
    <div>
      <h1>GitHub Stars</h1>
      <ul>{repos.map(n => <li>{n.name}</li>)}</ul>
    </div>
  );
};

const repos = graphql<
  StarredReposQuery,
  StarredReposQueryVariables
>(REPO_QUERY, {
  props: ({ data: { loading, viewer, error } }): Props => ({
    loading,
    repos: viewer ? viewer.starredRepositories.nodes : []
  })
});

export default repos(GitHubStars as any);
