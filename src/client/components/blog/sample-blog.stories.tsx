import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SampleBlog from './sample-blog/sample-blog';
import StoryRouter from 'storybook-router';
import AngularEnvVar from './angular-env-var/angular-env-var';

storiesOf('Blog Item', module)
  .add('Sample', () => <SampleBlog />)
  .add('Angular', () => <AngularEnvVar />);
