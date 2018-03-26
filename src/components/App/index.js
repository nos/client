import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import App from './App';
import withAuthError from '../../hocs/withAuthError';
import withAuthState from '../../hocs/withAuthState';

export default compose(
  withRouter,
  withAuthError, // alert error on auth failure
  withAuthState() // pass authenticated state to component
)(App);
