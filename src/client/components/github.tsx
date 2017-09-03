import * as React from 'react';
import graphql from 'react-relay';
import { QueryRenderer } from 'react-relay';

// const GitHub: React.SFC = () => <h1>GitHub</h1>;

const { Environment, Network, RecordSource, Store } = require('relay-runtime');

const source = new RecordSource();
const store = new Store(source);
function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json',
      Authorization: 'bearer 996763bd7acadea76464be168061d08de596a08a'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const handlerProvider = null;

const environment = new Environment({
  handlerProvider, // Can omit.
  network,
  store
});

// query={graphql`
// query githubQuery {
//   viewer {
//     name
//     repositories(last: 3) {
//       nodes {
//         name
//       }
//     }
//   }
// }
// `}

// Render this somewhere with React:
const GitHub = (
  <QueryRenderer
    environment={environment}
    variables={{
      pageID: '110798995619330'
    }}
    render={({ error, props }) => {
      if (error) {
        return (
          <div>
            {error}
          </div>
        );
      } else if (props) {
        return (
          <div>
            {props} is great!
          </div>
        );
      }
      return <div>Loading</div>;
    }}
  />
);

export default GitHub;

// console.log(
//   graphql`
//     query githubQuery {
//       viewer {
//         name
//         repositories(last: 3) {
//           nodes {
//             name
//           }
//         }
//       }
//     }
//   `
// );

// console.log(
//   graphql`
//     fragment github_repository on Repository {
//       isFork
//       isMirror
//       isPrivate
//     }
//   `
// );
