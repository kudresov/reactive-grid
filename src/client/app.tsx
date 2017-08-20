import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Contacts from './components/contacts';
import Header from './components/header';

const App = () =>
  <Switch>
    <div>
      <Header />
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contacts" component={Contacts} />
    </div>
  </Switch>;

export default App;
