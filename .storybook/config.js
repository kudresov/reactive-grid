import { configure } from '@storybook/react';
require('../src/client/reset.css');
require('../src/client/common.css');

const req = require.context('../src/client', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
