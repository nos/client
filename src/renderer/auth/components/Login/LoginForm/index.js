import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withData, withActions } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import previousAuthActions, { writePreviousAuthActions } from 'auth/actions/previousAuthActions';
import accountActions from 'auth/actions/accountActions';
import withLogin from 'auth/hocs/withLogin';

import LoginForm from './LoginForm';

const mapAccountActionsToProps = (actions) => ({
  resetAccounts: actions.reset
});

const mapAccountActionsDataToProps = (accounts) => ({
  accounts
});

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapPreviousAuthDataToProps = (data) => ({
  previousAuth: data && data.label
});

export default compose(
  withActions(accountActions, mapAccountActionsToProps),
  withInitialCall(accountActions),
  withInitialCall(previousAuthActions),

  withData(accountActions, mapAccountActionsDataToProps),
  withData(previousAuthActions, mapPreviousAuthDataToProps),

  withState('currentAccount', 'setCurrentAccount', ({ accounts, previousAuth }) => {
    return previousAuth || (Object.values(accounts)[0] && Object.values(accounts)[0].accountLabel);
  }),
  withState('passphrase', 'setPassphrase', ''),

  // store accountLabebl to store previously selected lable
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => {
    history.push('/browser');
  })
)(LoginForm);
