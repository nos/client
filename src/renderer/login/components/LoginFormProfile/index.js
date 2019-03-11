import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withData, withActions } from 'spunky';
import { isEmpty } from 'lodash';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNullLoader from 'browser/hocs/withNullLoader';

import { getProfiles } from 'register/actions/storeProfileActions';

import LoginFormProfile from './LoginFormProfile';
import previousAuthActions, {
  writePreviousAuthActions
} from '../../actions/previousProfileActions';
import withLogin from '../../hocs/withLogin';

const mapProfileActionsToProps = ({ profiles }) => ({
  walletsFound: !isEmpty(profiles),
  profiles
});

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapPreviousAuthDataToProps = (data) => ({
  encryptedWIF: data && data.encryptedWIF
});

export default compose(
  withInitialCall(getProfiles),
  withInitialCall(previousAuthActions),

  withNullLoader(getProfiles),
  withNullLoader(previousAuthActions),

  withData(getProfiles, mapProfileActionsToProps),
  withData(previousAuthActions, mapPreviousAuthDataToProps),

  withState(
    'currentProfile',
    'setCurrentProfile',
    ({ encryptedWIF, profiles }) => encryptedWIF || (profiles && profiles[0].encryptedKey)
  ),
  withState('passphrase', 'setPassphrase', ''),

  // store encryptedWIF on login so we can quickly authenticate again next time the app launches
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),
  withLogin((data, props) => props.setLastLogin({ encryptedWIF: props.currentProfile })),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormProfile);
