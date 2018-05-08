import { compose, mapProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withProgress, progressValues } from 'spunky';
import { omit } from 'lodash';

import PrivateRoute from './PrivateRoute';
import authActions from '../../../login/actions/authActions';

const { LOADED } = progressValues;

export default compose(
  withRouter,
  withProgress(authActions),
  mapProps((props) => ({ ...omit(props, 'progress'), authenticated: props.progress === LOADED }))
)(PrivateRoute);
