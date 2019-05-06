import { compose } from 'recompose';
import { withData, withActions } from 'spunky';

import authActions, { addAccountActions } from 'auth/actions/authActions';

import Accounts from './Accounts';

const mapAuthDataToProps = (auth) => auth;
const mapAddAccountActionsToProps = (actions, props) => ({
  addAccount: (data) => actions.call({
    ...data,
    account: props
  })
});

// TODO with error toast
export default compose(
  withData(authActions, mapAuthDataToProps),
  withActions(addAccountActions, mapAddAccountActionsToProps)
)(Accounts);
