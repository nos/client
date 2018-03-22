import electron from 'electron';
import { compose, mapProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withProgress, progressValues } from 'spunky';
import { omit } from 'lodash';

import App from './App';
import authActions from '../../actions/authActions';
import withLogin from '../../hocs/withLogin';
import withLogout from '../../hocs/withLogout';
import withAuthError from '../../hocs/withAuthError';

const { ipcRenderer: ipc } = electron;

const { LOADED } = progressValues;

export default compose(
  withRouter,

  // IPC messaging to maintain authentication state in app.
  withLogin(({ wif }) => ipc.send('login', { wif })),
  withLogout(() => ipc.send('logout')),

  // redirect on login/logout
  withLogin((data, { history }) => history.push('/')),
  withLogout((data, { history }) => history.push('/login')),

  // alert error on auth failure
  withAuthError,

  // pass authenticated state to component
  withProgress(authActions),
  mapProps((props) => ({ ...omit(props, 'progress'), authenticated: props.progress === LOADED }))
)(App);
