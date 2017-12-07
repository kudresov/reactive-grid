import * as React from 'react';
import { storiesOf, action } from '@storybook/react';
import Blog from './blog';
import StoryRouter from 'storybook-router';
import backgrounds from '@storybook/addon-backgrounds';

storiesOf('Blog', module).add('Default', () => <Blog />);
