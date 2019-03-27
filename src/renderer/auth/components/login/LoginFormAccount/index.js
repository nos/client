import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withData, withActions } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNullLoader from 'browser/hocs/withNullLoader';
import previousAuthActions, {
  writePreviousAuthActions
} from 'auth/actions/previousAuthActions';
import accountActions from 'auth/actions/accountActions';
import withLogin from 'auth/hocs/withLogin';

import LoginFormAccount from './LoginFormAccount';

const mapAccountActionsToProps = (accounts) => ({
  accounts
});

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapPreviousAuthDataToProps = (data) => ({
  previousAuth: data && data.label
});

export default compose(
  withInitialCall(accountActions),
  withInitialCall(previousAuthActions),

  withNullLoader(accountActions),
  withNullLoader(previousAuthActions),

  withData(accountActions, mapAccountActionsToProps),
  withData(previousAuthActions, mapPreviousAuthDataToProps),

  withState(
    'currentAccount',
    'setCurrentAccount',
    ({ accounts, previousAuth }) => previousAuth ||
      (Object.values(accounts)[0] && Object.values(accounts)[0].accountLabel)
  ),
  withState('passphrase', 'setPassphrase', ''),

  // store accountLabebl to store previously selected lable
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history, setLastLogin, currentAccount }) => {
    setLastLogin({ label: currentAccount });
    history.push('/browser');
  })
)(LoginFormAccount);
