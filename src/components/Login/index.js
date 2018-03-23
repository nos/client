import electron from 'electron';
import { compose, withState } from 'recompose';
import {
  withCall,
  withData,
  withActions,
  withProgressComponents,
  alreadyLoadedStrategy,
  progressValues
} from 'spunky';

import Login from './Login';
import Loading from '../Loading';
import authActions from '../../actions/authActions';
import previousAuthActions, { writePreviousAuthActions } from '../../actions/previousAuthActions';
import withLogin from '../../hocs/withLogin';
import withLogout from '../../hocs/withLogout';

const { ipcRenderer: ipc } = electron;

const { LOADING } = progressValues;

const mapPreviousAuthDataToProps = ({ encryptedWIF }) => ({ encryptedWIF });

const mapAuthActionsToProps = ({ call }) => ({
  onLogin: ({ wif, passphrase, encryptedWIF }) => call({ wif, passphrase, encryptedWIF })
});

const mapPreviousAuthActionsToProps = ({ call }) => ({
  setLastLogin: (data) => call(data)
});

export default compose(
  withCall(previousAuthActions),
  withProgressComponents(previousAuthActions, {
    [LOADING]: Loading
  }, {
    strategy: alreadyLoadedStrategy
  }),
  withData(previousAuthActions, mapPreviousAuthDataToProps),
  withActions(authActions, mapAuthActionsToProps),
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),

  // input values and handlers
  withState('wif', 'setWIF', ''),
  withState('encryptedWIF', 'setEncryptedWIF', (props) => props.encryptedWIF || ''),
  withState('passphrase', 'setPassphrase', ''),

  // IPC messaging to maintain authentication state in app.
  withLogin(({ wif }) => ipc.send('login', { wif })),
  withLogout(() => ipc.send('logout')),

  // store encryptedWIF so we can quickly login again next time the app launches
  withLogin((data, props) => props.setLastLogin({ encryptedWIF: props.encryptedWIF })),

  // redirect on login/logout
  withLogin((data, { history }) => history.push('/')),
  withLogout((data, { history }) => history.push('/login')),
)(Login);
