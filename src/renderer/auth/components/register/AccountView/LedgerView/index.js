import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withData, withError, withActions, withProgress, recentlyCompletedStrategy } from 'spunky';

import ledgerActions, { ledgerPublicKeyActions } from 'auth/actions/ledgerActions';
import withLogin from 'auth/hocs/withLogin';

import LedgerView from './LedgerView';

const mapLedgerActionsToProps = (actions) => ({
  poll: () => actions.call()
});

const mapLedgerDataToProps = (data) => {
  const { deviceInfo } = data || {};
  return { deviceInfo };
};

const mapLedgerErrorToProps = (deviceInfoError) => console.log('deviceInfoError', deviceInfoError) || {
  deviceInfoError
};

const mapLedgerPublicKeyActionsToProps = (actions) => ({
  getPublicKey: () => actions.call()
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

  withData(ledgerActions, mapLedgerDataToProps),
  withData(ledgerPublicKeyActions, mapLedgerPublicKeyDataToProps),

  withError(ledgerActions, mapLedgerErrorToProps),
  withError(ledgerPublicKeyActions, mapLedgerPublicKeyErrorToProps),

  // withProgress(ledgerActions, {
  //   strategy: recentlyCompletedStrategy
  // }),
  // withProgress(ledgerPublicKeyActions, {
  //   strategy: recentlyCompletedStrategy
  // }),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LedgerView);
