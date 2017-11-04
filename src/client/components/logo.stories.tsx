import * as React from 'react';
import { storiesOf, action } from '@storybook/react';
import Logo from './logo';
import StoryRouter from 'storybook-router';

storiesOf('Logo', module)
  .addDecorator(StoryRouter())
  .add('Standard', () => <Logo />);
