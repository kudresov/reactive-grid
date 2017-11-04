import * as React from 'react';
import { storiesOf, action } from '@storybook/react';
import StoryRouter from 'storybook-router';
import backgrounds from '@storybook/addon-backgrounds';
import FrontBackendSection from './frontend-backend-section';

storiesOf('FrontendBackendSection', module).add('Default', () => (
  <FrontBackendSection />
));
