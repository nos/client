import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withData, withError, withActions } from 'spunky';

import LoginFormLedger from './LoginFormLedger';
import ledgerActions from '../../actions/ledgerActions';
import withLogin from '../../hocs/withLogin';

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
  withActions(ledgerActions, mapLedgerActionsToProps),
  withData(ledgerActions, mapLedgerDataToProps),
  withError(ledgerActions, mapLedgerErrorToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormLedger);
