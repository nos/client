import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import Login from '../Login';
import Logout from '../Logout';
import DAppExample from '../DAppExample';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/logout" component={Logout} />
      <PrivateRoute exact path="/dapp" component={DAppExample} />
      <Redirect to="/" />
    </Switch>
  );
}
