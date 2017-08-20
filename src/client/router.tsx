import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

export const Router: React.SFC = () =>
  <BrowserRouter>
    <App />
  </BrowserRouter>;
