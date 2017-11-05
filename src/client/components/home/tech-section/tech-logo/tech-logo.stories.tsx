import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TechLogo from './tech-logo';

storiesOf('TechLogo', module)
  .add('react', () => (
    <TechLogo imgSrc="../../../../assets/react-logo.svg" logoName="react" />
  ))
  .add('preact', () => (
    <TechLogo imgSrc="../../../../assets/preact.png" logoName="preact" />
  ))
  .add('redux', () => (
    <TechLogo imgSrc="../../../../assets/redux.svg" logoName="redux" />
  ));
