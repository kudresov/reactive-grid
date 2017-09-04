import * as React from 'react';
import { gql, graphql } from 'react-apollo';

const GitHub: React.SFC = result => {
  if ((result as any).data.loading) {
    return <h1>loading..</h1>;
  }
  return (
    <div>
      <h1>GitHub</h1>
      <h2>Data</h2>
      <ul>
        {(result as any).data.viewer.repositories.nodes.map(n => (
          <li>{n.name}</li>
        ))}
      </ul>
    </div>
  );
};

const query = graphql(gql`
  {
    viewer {
      name
      repositories(last: 3) {
        nodes {
          name
        }
      }
    }
  }
`)(GitHub);

export default query;
