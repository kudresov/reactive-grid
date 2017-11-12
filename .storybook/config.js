import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-router';
import backgrounds from '@storybook/addon-backgrounds';

require('../src/client/reset.css');
require('../src/client/common.css');

const req = require.context('../src/client', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(StoryRouter());
// addDecorator(
//   backgrounds([
//     { name: 'dark', value: '#cfd9df', default: true },
//     { name: 'light', value: '#e2ebf0' }
//   ])
// );

configure(loadStories, module);
