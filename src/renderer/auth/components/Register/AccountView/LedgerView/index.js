import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
  withData,
  withError,
  withActions,
  withProgress,
  recentlyCompletedStrategy,
  progressValues
} from 'spunky';

import ledgerActions, { ledgerPublicKeyActions } from 'auth/actions/ledgerActions';
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
  getPublicKey: actions.call
});

const mapLedgerPublicKeyDataToProps = (data) => {
  const { publicKey } = data || {};
  return { publicKey };
};

const mapLedgerPublicKeyErrorToProps = (publicKeyError) => ({
  publicKeyError
});

const mapRegisterActionsToProps = (actions) => ({
  storeFormData: (data) => {
    return actions.call(data);
  }
});

export default compose(
  withActions(registerActions, mapRegisterActionsToProps),

  withActions(ledgerActions, mapLedgerActionsToProps),
  withActions(ledgerPublicKeyActions, mapLedgerPublicKeyActionsToProps),

  withData(ledgerActions, mapLedgerDataToProps),
  withData(ledgerPublicKeyActions, mapLedgerPublicKeyDataToProps),

  withError(ledgerActions, mapLedgerErrorToProps),
  withError(ledgerPublicKeyActions, mapLedgerPublicKeyErrorToProps),

  withProgress(ledgerActions, {
    propName: 'deviceInfoProgress',
    strategy: recentlyCompletedStrategy
  }),
  withProgress(ledgerPublicKeyActions, {
    propName: 'publickeyProgress',
    strategy: recentlyCompletedStrategy
  }),
  withProgressChange(registerActions, FAILED, (state, props) => {
    props.showErrorToast(`Account creation failed: ${state.error}`);
  }),
  withProgressChange(registerActions, LOADED, (state, props) => {
    props.nextStep();
  })

  // redirect on login TODO remove?
  // withRouter,
  // withLogin((state, { history }) => history.push('/browser'))
)(LedgerView);
