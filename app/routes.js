/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Translate from './components/Translate';

export default () => (
  <App>
    <Switch>
      <Route path="/translate" component={Translate} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
