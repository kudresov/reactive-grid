import * as React from 'react';
import graphql from 'react-relay';

const GitHub: React.SFC = () => <h1>GitHub</h1>;

export default GitHub;

console.log(
  graphql`
    {
      user(name: "kudresov") {
        name
        repositories(first: 5, orderby: FULL_NAME) {
          name
          description
        }
      }
    }
  `
);
