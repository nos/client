import { compose } from 'recompose';
import { withData } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNullLoader from 'browser/hocs/withNullLoader';
import accountActions from 'auth/actions/accountActions';

import Login from './Login';

const mapAccountActionsToProps = (accounts) => ({
  accounts
});

export default compose(
  withInitialCall(accountActions),

  withNullLoader(accountActions),

  withData(accountActions, mapAccountActionsToProps)
)(Login);
