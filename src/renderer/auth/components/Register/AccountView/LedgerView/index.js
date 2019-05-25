import { withRouter } from 'react-router-dom';
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
import withLogin from 'auth/hocs/withLogin';

import registerLedgerActions from 'auth/actions/registerLedgerActions';

import LedgerView from './LedgerView';
import registerActions from '../../../../actions/registerActions';

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
  getPublicKeys: (data) => actions.call(data)
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
  withActions(registerActions, mapRegisterActionsToProps),

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
  withProgressChange(registerActions, FAILED, (state, props) => {
    props.showErrorToast(`Account creation failed: ${state.error}`);
  }),
  withProgressChange(registerActions, LOADED, (state, props) => {
    props.nextStep();
  }),

  withState('selectedPublicKey', 'setSelectedPublicKey', ({ publicKeys }) => (publicKeys ? publicKeys[0].index : ''))

  // redirect on login TODO remove?
  // withRouter,
  // withLogin((state, { history }) => history.push('/browser'))
)(LedgerView);
