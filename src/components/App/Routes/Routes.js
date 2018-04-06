import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../../PrivateRoute';
import Home from '../../Home';
import Login from '../../Login';
import Logout from '../../Logout';
import Browser from '../../Browser';
import Exchange from '../../Exchange';
import Favorites from '../../Favorites';
import DAppContainer from '../../DAppContainer';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/dapp" component={DAppContainer} />
      <PrivateRoute exact path="/browser" component={Browser} />
      <PrivateRoute exact path="/exchange" component={Exchange} />
      <PrivateRoute exact path="/favorites" component={Favorites} />
      <PrivateRoute exact path="/logout" component={Logout} />
      <Redirect to="/" />
    </Switch>
  );
}
