import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Register } from 'register';
import { Login } from 'login';
import { Logout } from 'logout';
import { Browser } from 'browser';

import PrivateRoute from '../../PrivateRoute';
import LoginLayout from '../../LoginLayout';
import AuthenticatedLayout from '../../AuthenticatedLayout';
import withLayout from '../../../hocs/withLayout';

const withLoginLayout = withLayout(LoginLayout);
const withAuthLayout = withLayout(AuthenticatedLayout);

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/browser" component={withAuthLayout(Browser)} />
      <PrivateRoute exact path="/login" component={withAuthLayout(Login)} />
      <PrivateRoute exact path="/register" component={withAuthLayout(Register)} />
      <PrivateRoute exact path="/logout" component={withAuthLayout(Logout)} />
      <Redirect to="/browser" />
    </Switch>
  );
}
