import { compose } from 'recompose';
import { withData, withError, withActions } from 'spunky';

import Login from './Login';
import authActions from '../../actions/authActions';
import ledgerActions from '../../actions/ledgerActions';

const mapAuthActionsToProps = (actions) => ({
  login: ({ wif, passphrase, encryptedWIF, publicKey }) => {
    return actions.call({ wif, passphrase, encryptedWIF, publicKey });
  }
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
  withActions(authActions, mapAuthActionsToProps),
  withActions(ledgerActions, mapLedgerActionsToProps),
  withData(ledgerActions, mapLedgerDataToProps),
  withError(ledgerActions, mapLedgerErrorToProps)
)(Login);
