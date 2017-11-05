import * as React from 'react';
import GitHubRepos from './github-repos';
import { storiesOf, action } from '@storybook/react';

storiesOf('GitHubRepos', module)
  .add('Default', () => (
    <GitHubRepos
      repos={[{ name: 'repo1' }, { name: 'repo2' }]}
      loading={false}
      hasNext={true}
      hasPrevious={false}
      getNext={action('next')}
      getPrevious={action('previous')}
    />
  ))
  .add('Loading', () => (
    <GitHubRepos
      repos={[]}
      loading={true}
      hasNext={true}
      hasPrevious={true}
      getNext={action('next')}
      getPrevious={action('previous')}
    />
  ));
