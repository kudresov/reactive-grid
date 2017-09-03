import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Blog from './components/home';
import About from './components/about';
import Projects from './components/contacts';
import Header from './components/header';
import GitHub from './components/github';
import routes from '../shared/routes';

const App = () =>
  <Switch>
    <div>
      <Header />
      <hr />
      <Route path={routes.blog} component={Blog} />
      <Route path={routes.about} component={About} />
      <Route path={routes.projects} component={Projects} />
      <Route path={routes.github} component={GitHub as any} />
    </div>
  </Switch>;

export default App;
