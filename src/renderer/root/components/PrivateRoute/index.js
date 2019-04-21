import { compose, mapProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withProgress, progressValues } from 'spunky';
import { omit } from 'lodash';

import withAuth from 'shared/hocs/withAuth';

import authActions from 'auth/actions/authActions';

import PrivateRoute from './PrivateRoute';

const { LOADED } = progressValues;

export default compose(
  withRouter,
  withProgress(authActions),
  withAuth(),
  mapProps((props) => ({ ...omit(props, 'progress'), authenticated: props.progress === LOADED }))
)(PrivateRoute);
