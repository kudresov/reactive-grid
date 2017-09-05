import * as React from 'react';
import { gql, graphql } from 'react-apollo';
import { GetLastReposQuery, GetLastReposQueryVariables } from '../../../schema';

const REPO_QUERY = gql`
  query GetLastRepos($count: Int) {
    viewer {
      name
      repositories(last: $count) {
        nodes {
          name
        }
      }
    }
  }
`;

const last5Repos = graphql<
  GetLastReposQuery,
  GetLastReposQueryVariables
>(REPO_QUERY, {
  options: () => ({
    variables: {
      count: 5
    }
  })
});

const GitHub = last5Repos(({ data: { loading, viewer, error } }) => {
  if (loading) {
    return <h1>loading..</h1>;
  }
  return (
    <div>
      <h1>GitHub</h1>
      <h2>Data!</h2>
      <ul>{viewer.repositories.nodes.map(n => <li>{n.name}</li>)}</ul>
    </div>
  );
});

const query = graphql<{}, any>(REPO_QUERY)(GitHub);

export default GitHub;
