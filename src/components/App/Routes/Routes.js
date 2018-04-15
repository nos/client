import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../../PrivateRoute';
import Register from '../../Register';
import Login from '../../Login';
import Logout from '../../Logout';
import Browser from '../../Browser';
import Exchange from '../../Exchange';
import Favorites from '../../Favorites';
import Account from '../../Account';
import Settings from '../../Settings';
import LoginLayout from '../../LoginLayout';
import AuthenticatedLayout from '../../AuthenticatedLayout';
import withLayout from '../../../hocs/withLayout';

const withLoginLayout = withLayout(LoginLayout);
const withAuthLayout = withLayout(AuthenticatedLayout);

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={withLoginLayout(Login)} />
      <Route exact path="/register" component={withLoginLayout(Register)} />
      <PrivateRoute exact path="/browser" component={withAuthLayout(Browser)} />
      <PrivateRoute exact path="/browser/:query+" component={withAuthLayout(Browser)} />
      <PrivateRoute exact path="/favorites" component={withAuthLayout(Favorites)} />
      <PrivateRoute exact path="/exchange" component={withAuthLayout(Exchange)} />
      <PrivateRoute exact path="/account" component={withAuthLayout(Account)} />
      <PrivateRoute exact path="/settings" component={withAuthLayout(Settings)} />
      <PrivateRoute exact path="/logout" component={withAuthLayout(Logout)} />
      <Redirect to="/browser" />
    </Switch>
  );
}
