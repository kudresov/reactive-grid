import * as React from 'react';
import GitHubSection from './github-section';
import { storiesOf, action } from '@storybook/react';

storiesOf('GitHubRepos', module)
  .add('Default', () => (
    <GitHubSection
      repos={[{ name: 'repo1' }, { name: 'repo2' }]}
      loading={false}
      hasNext={true}
      hasPrevious={false}
      getNext={action('next')}
      getPrevious={action('previous')}
      title="Title"
      imgSrc="../../assets/repo.svg"
    />
  ))
  .add('Loading', () => (
    <GitHubSection
      repos={[]}
      loading={true}
      hasNext={true}
      hasPrevious={true}
      getNext={action('next')}
      getPrevious={action('previous')}
      title="Title"
      imgSrc="../../assets/repo.svg"
    />
  ));
