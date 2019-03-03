import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withData, withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import Loading from 'shared/components/Loading';

import { getProfiles } from 'register/actions/storeProfileActions';

import LoginFormProfile from './LoginFormProfile';
import withLogin from '../../hocs/withLogin';

const { LOADING } = progressValues;

const mapProfileActionsToProps = ({ profiles }) => ({ profiles });

export default compose(
  withInitialCall(getProfiles),
  withProgressComponents(
    getProfiles,
    {
      [LOADING]: Loading
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),
  withData(getProfiles, mapProfileActionsToProps),

  withState(
    'currentProfile',
    'setCurrentProfile',
    ({ profiles }) => profiles && profiles[0].encryptedKey
  ),
  withState('passphrase', 'setPassphrase', ''),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormProfile);
