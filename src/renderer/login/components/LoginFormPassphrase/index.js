import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import {
  withData,
  withActions,
  withProgressComponents,
  alreadyLoadedStrategy,
  progressValues
} from 'spunky';

import Loading from 'shared/components/Loading';
import withInitialCall from 'shared/hocs/withInitialCall';

import LoginFormPassphrase from './LoginFormPassphrase';
import previousAuthActions, { writePreviousAuthActions } from '../../actions/previousAuthActions';
import withLogin from '../../hocs/withLogin';

const { LOADING } = progressValues;

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapPreviousAuthDataToProps = (data) => ({
  encryptedWIF: data && data.encryptedWIF
});

export default compose(
  withInitialCall(previousAuthActions),
  withProgressComponents(
    previousAuthActions,
    {
      [LOADING]: Loading
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),
  withData(previousAuthActions, mapPreviousAuthDataToProps),

  withState('encryptedWIF', 'setEncryptedWIF', (props) => props.encryptedWIF || ''),
  withState('passphrase', 'setPassphrase', ''),

  // store encryptedWIF on login so we can quickly authenticate again next time the app launches
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),
  withLogin((data, props) => props.setLastLogin({ encryptedWIF: props.encryptedWIF })),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormPassphrase);
