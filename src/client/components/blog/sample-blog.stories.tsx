import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SampleBlog from './sample-blog';
import StoryRouter from 'storybook-router';

storiesOf('Blog Item', module).add('Default', () => <SampleBlog />);
