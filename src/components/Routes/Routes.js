import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import DAppExample from '../DAppExample';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dapp" component={DAppExample} />
      <Redirect to="/" />
    </Switch>
  );
}
