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

const mapPreviousAuthDataToProps = (data) => console.log('Previous out', data) || {
    label: data && data.label
  };

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
    ({ accounts, ...rest }) => console.log('rest, ', rest) ||
      (Object.values(accounts)[0] && Object.values(accounts)[0].label)
  ),
  withState('passphrase', 'setPassphrase', ''),

  // store encryptedWIF on login so we can quickly authenticate again next time the app launches
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormAccount);
