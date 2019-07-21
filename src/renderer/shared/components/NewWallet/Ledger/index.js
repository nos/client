import { compose, withState } from 'recompose';
import {
  withData,
  withError,
  withActions,
  withProgress,
  recentlyCompletedStrategy,
  progressValues
} from 'spunky';

import ledgerActions, { ledgerPublicKeysActions } from 'auth/actions/ledgerActions';
import withProgressChange from 'shared/hocs/withProgressChange';
import registerFormActions from 'register/actions/registerFormActions';

import Ledger from './Ledger';

const { FAILED, LOADED } = progressValues;

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
  getPublicKey: actions.call
});

const mapLedgerPublicKeyDataToProps = (data) => {
  const { publicKeys } = data || {};
  return { publicKeys };
};

const mapLedgerPublicKeyErrorToProps = (publicKeyError) => ({
  publicKeyError
});

const mapRegisterActionsToProps = (actions) => ({
  storeFormData: (data) => actions.call(data)
});

export default compose(
  withActions(registerFormActions, mapRegisterActionsToProps),

  withActions(ledgerActions, mapLedgerActionsToProps),
  withActions(ledgerPublicKeysActions, mapLedgerPublicKeyActionsToProps),

  withData(ledgerActions, mapLedgerDataToProps),
  withData(ledgerPublicKeysActions, mapLedgerPublicKeyDataToProps),

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
  withProgressChange(registerFormActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),
  withProgressChange(registerFormActions, LOADED, (state, props) => {
    props.nextStep();
  }),

  withState('selectedPublicKey', 'setSelectedPublicKey', ({ publicKeys }) =>
    publicKeys ? publicKeys[0].index : ''
  )
)(Ledger);
