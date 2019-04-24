import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
  withData,
  withError,
  withActions,
  progressValues,
  withProgress,
  recentlyCompletedStrategy
} from 'spunky';

import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import ledgerActions, { ledgerPublicKeyActions } from 'auth/actions/ledgerActions';
import withLogin from 'auth/hocs/withLogin';

import LedgerView from './LedgerView';

const { LOADING, LOADED, FAILED } = progressValues;

const mapLedgerActionsToProps = (actions) => ({
  poll: actions.call
});

const mapLedgerDataToProps = (data) => {
  const { deviceInfo } = data || {};
  return { deviceInfo };
};

const mapLedgerErrorToProps = (deviceInfoError) => console.log('deviceInfoError', deviceInfoError) || {
  deviceInfoError
};

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

export default compose(
  withActions(ledgerActions, mapLedgerActionsToProps),
  withActions(ledgerPublicKeyActions, mapLedgerPublicKeyActionsToProps),

  withProgress(ledgerActions, {
    strategy: recentlyCompletedStrategy
  }),
  // withProgress(ledgerPublicKeyActions, {
  //   strategy: recentlyCompletedStrategy
  // }),

  withData(ledgerActions, mapLedgerDataToProps),
  withData(ledgerPublicKeyActions, mapLedgerPublicKeyDataToProps),

  withError(ledgerActions, mapLedgerErrorToProps),
  withError(ledgerPublicKeyActions, mapLedgerPublicKeyErrorToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LedgerView);
