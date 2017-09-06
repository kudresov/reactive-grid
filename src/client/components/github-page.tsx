import * as React from 'react';
import GitHubStars from './github-stars';
import GitHubRepos from './github-repos';

const GitHubPage: React.SFC = () => (
  <div>
    <GitHubStars reposCount={5} />
    <GitHubRepos reposCount={5} />
  </div>
);

export default GitHubPage;
