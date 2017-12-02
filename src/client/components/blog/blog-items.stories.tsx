import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SampleBlog from './sample-blog';
import StoryRouter from 'storybook-router';
import { BlogItems } from './blog-items';
import SampleBlogOverview from './sample-blog-overview';

storiesOf('Blog Items', module).add('Default', () => (
  <BlogItems>
    <SampleBlogOverview />
    <SampleBlogOverview />
  </BlogItems>
));
