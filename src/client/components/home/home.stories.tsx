import * as React from 'react';
import { storiesOf, action } from '@storybook/react';
import StoryRouter from 'storybook-router';
import backgrounds from '@storybook/addon-backgrounds';
import Home from './';

storiesOf('Home', module).add('Default', () => <Home />);
