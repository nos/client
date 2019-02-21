import { compose, mapProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withProgress, progressValues } from 'spunky';
import { omit } from 'lodash';

import withLogin from 'shared/hocs/withLogin';

import authActions from 'login/actions/authActions';

import PrivateRoute from './PrivateRoute';

const { LOADED } = progressValues;

export default compose(
  withRouter,
  withProgress(authActions),
  withLogin(),
  mapProps((props) => ({ ...omit(props, 'progress'), authenticated: props.progress === LOADED }))
)(PrivateRoute);
