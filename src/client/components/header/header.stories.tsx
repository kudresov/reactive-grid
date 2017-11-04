import * as React from 'react';
import { storiesOf, action } from '@storybook/react';
import Header from './header';
import StoryRouter from 'storybook-router';
import backgrounds from '@storybook/addon-backgrounds';

storiesOf('Header', module).add('Default', () => <Header />);
