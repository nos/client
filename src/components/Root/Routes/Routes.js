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
import AuthenticatedLayout from '../../Layout/AuthenticatedLayout';
import withLayout from '../../../hocs/withLayout';

const withAuthLayout = withLayout(AuthenticatedLayout);

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={withAuthLayout(Home)} />
      <PrivateRoute exact path="/dapp" component={withAuthLayout(DAppContainer)} />
      <PrivateRoute exact path="/browser" component={withAuthLayout(Browser)} />
      <PrivateRoute exact path="/exchange" component={withAuthLayout(Exchange)} />
      <PrivateRoute exact path="/favorites" component={withAuthLayout(Favorites)} />
      <PrivateRoute exact path="/logout" component={withAuthLayout(Logout)} />
      <Redirect to="/" />
    </Switch>
  );
}
