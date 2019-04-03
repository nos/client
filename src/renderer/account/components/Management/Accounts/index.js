import { compose } from 'recompose';
import { withData, withActions } from 'spunky';

import addAccount from 'auth/actions/addAccountActions';
import authActions from 'auth/actions/authActions';

import Accounts from './Accounts';

const mapAuthDataToProps = (auth) => auth;
const mapAddAccountActionsToProps = (actions, props) => console.log(props) || {
    addAccount: ({ type }) => actions.call({
        type,
        authData: props
      })
  };

export default compose(
  withData(authActions, mapAuthDataToProps),
  withActions(addAccount, mapAddAccountActionsToProps)
)(Accounts);
