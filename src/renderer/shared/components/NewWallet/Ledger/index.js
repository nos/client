import { compose, withState } from 'recompose';
import {
  withData,
  withError,
  withActions,
  withProgress,
  recentlyCompletedStrategy,
  progressValues
} from 'spunky';

import walletActions, { addWalletActions } from 'auth/actions/walletActions';
import ledgerActions, { ledgerPublicKeysActions } from 'auth/actions/ledgerActions';
import withProgressChange from 'shared/hocs/withProgressChange';
import { DEFAULT_COIN } from 'shared/values/coins';
import { withErrorToast } from 'shared/hocs/withToast';

import Ledger from './Ledger';

const { FAILED, LOADED } = progressValues;

const mapAddAccountActionsToProps = (actions) => ({
  addAccount: (data) => actions.call(data)
});

const mapLedgerActionsToProps = (actions) => ({
  poll: actions.call
});

const mapLedgerDataToProps = (data) => {
  const { deviceInfo } = data || {};
  return { deviceInfo };
};

const mapLedgerErrorToProps = (deviceInfoError) => ({
  deviceInfoError
});

const mapLedgerPublicKeyActionsToProps = (actions) => ({
  getPublicKeys: actions.call
});

const mapLedgerPublicKeyDataToProps = (data) => {
  const { publicKeys } = data || {};
  return { publicKeys };
};

const mapLedgerPublicKeyErrorToProps = (publicKeyError) => ({
  publicKeyError
});

const mapWalletDataToProps = (wallets) => ({ wallets });

export default compose(
  withErrorToast(),

  withActions(ledgerActions, mapLedgerActionsToProps),
  withActions(ledgerPublicKeysActions, mapLedgerPublicKeyActionsToProps),

  withData(ledgerActions, mapLedgerDataToProps),
  withData(ledgerPublicKeysActions, mapLedgerPublicKeyDataToProps),
  withData(walletActions, mapWalletDataToProps),

  withError(ledgerActions, mapLedgerErrorToProps),
  withError(ledgerPublicKeysActions, mapLedgerPublicKeyErrorToProps),

  withProgress(ledgerActions, {
    propName: 'deviceInfoProgress',
    strategy: recentlyCompletedStrategy
  }),
  withProgress(ledgerPublicKeysActions, {
    propName: 'publickeyProgress',
    strategy: recentlyCompletedStrategy
  }),

  withActions(addWalletActions, mapAddAccountActionsToProps),
  withProgressChange(addWalletActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),
  withProgressChange(addWalletActions, LOADED, (state, props) => {
    props.onConfirm();
  }),
  withState('coinType', 'setCoinType', ({ coinType }) => coinType || DEFAULT_COIN),
  withState('passphrase', 'setPassphrase', ''),
  withState('selectedPublicKey', 'setSelectedPublicKey', -1)
)(Ledger);
