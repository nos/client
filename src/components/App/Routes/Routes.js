import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../../PrivateRoute';
import Register from '../../../register/components';
import Login from '../../../login/components';
import Logout from '../../../logout/components';
import Browser from '../../../browser/components';
import Exchange from '../../../exchange/components';
import Favorites from '../../../favorites/components';
import Account from '../../../account/components';
import Settings from '../../../settings/components';
import LoginLayout from '../../LoginLayout';
import AuthenticatedLayout from '../../AuthenticatedLayout';
import withLayout from '../../../shared/hocs/withLayout';

const withLoginLayout = withLayout(LoginLayout);
const withAuthLayout = withLayout(AuthenticatedLayout);

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={withLoginLayout(Login)} />
      <Route exact path="/register" component={withLoginLayout(Register)} />
      <Route exact path="/browser" render={() => <Redirect to="/browser/nos.neo" />} />
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
