import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withData, withActions } from 'spunky';
import { isEmpty } from 'lodash';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNullLoader from 'browser/hocs/withNullLoader';
import previousAuthActions, {
  writePreviousAuthActions
} from 'auth/actions/previousAuthActions';
import accountActions from 'auth/actions/accountActions';
import withLogin from 'auth/hocs/withLogin';

import LoginFormProfile from './LoginFormProfile';

const mapProfileActionsToProps = (profiles) => ({
  profiles
});

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapPreviousAuthDataToProps = (data) => ({
  encryptedWIF: data && data.encryptedWIF
});

export default compose(
  withInitialCall(accountActions),
  withInitialCall(previousAuthActions),

  withNullLoader(accountActions),
  withNullLoader(previousAuthActions),

  withData(accountActions, mapProfileActionsToProps),
  withData(previousAuthActions, mapPreviousAuthDataToProps),

  withState(
    'currentProfile',
    'setCurrentProfile',
    ({ profiles }) => Object.values(profiles)[0] && Object.values(profiles)[0].label
  ),
  withState('passphrase', 'setPassphrase', ''),

  // store encryptedWIF on login so we can quickly authenticate again next time the app launches
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormProfile);
