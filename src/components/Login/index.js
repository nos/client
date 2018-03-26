import electron from 'electron';
import { compose, withState } from 'recompose';
import {
  withCall,
  withData,
  withError,
  withActions,
  withProgressComponents,
  alreadyLoadedStrategy,
  progressValues
} from 'spunky';

import Login from './Login';
import Loading from '../Loading';
import authActions from '../../actions/authActions';
import previousAuthActions, { writePreviousAuthActions } from '../../actions/previousAuthActions';
import ledgerActions from '../../actions/ledgerActions';
import withLogin from '../../hocs/withLogin';
import withLogout from '../../hocs/withLogout';

const { ipcRenderer: ipc } = electron;

const { LOADING } = progressValues;

const mapPreviousAuthDataToProps = ({ encryptedWIF }) => ({ encryptedWIF });

const mapAuthActionsToProps = (actions) => ({
  login: ({ wif, passphrase, encryptedWIF, publicKey }) => {
    return actions.call({ wif, passphrase, encryptedWIF, publicKey });
  }
});

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapLedgerActionsToProps = (actions) => ({
  poll: () => actions.call()
});

const mapLedgerDataToProps = (data) => {
  const { deviceInfo, publicKey } = data || {};
  return { deviceInfo, publicKey };
};

const mapLedgerErrorToProps = (error) => ({
  deviceError: error
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
  withActions(ledgerActions, mapLedgerActionsToProps),
  withData(ledgerActions, mapLedgerDataToProps),
  withError(ledgerActions, mapLedgerErrorToProps),

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
