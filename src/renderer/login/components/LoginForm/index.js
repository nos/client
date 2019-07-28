import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withData, withActions } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import previousAuthActions, { writePreviousAuthActions } from 'auth/actions/previousAuthActions';
import accountActions from 'auth/actions/accountActions';
import registerFormActions from 'register/actions/registerFormActions';
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
  previousAuth: data && data.label // TODO rename label to accountLabel
});

const mapRegisterFormActionsToProps = (actions) => ({
  resetRegisterFormData: () => actions.reset()
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
  withActions(registerFormActions, mapRegisterFormActionsToProps),

  // redirect on login
  withRouter,
  withLogin((state, { auth, history, setLastLogin, resetRegisterFormData }) => {
    setLastLogin({ label: auth.accountLabel });
    resetRegisterFormData();
    history.push('/browser');
  })
)(LoginForm);
