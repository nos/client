import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Logout } from 'logout';
import { Browser } from 'browser';

import AuthenticatedLayout from '../../AuthenticatedLayout';
import withLayout from '../../../hocs/withLayout';

const withAuthLayout = withLayout(AuthenticatedLayout);

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/browser" component={withAuthLayout(Browser)} />
      <Route exact path="/logout" component={withAuthLayout(Logout)} />
      <Redirect to="/browser" />
    </Switch>
  );
}
