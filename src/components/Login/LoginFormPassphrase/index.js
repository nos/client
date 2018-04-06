import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import {
  withData,
  withActions,
  withProgressComponents,
  alreadyLoadedStrategy,
  progressValues
} from 'spunky';

import LoginFormPassphrase from './LoginFormPassphrase';
import Loading from '../../Loading';
import previousAuthActions, { writePreviousAuthActions } from '../../../actions/previousAuthActions';
import withInitialCall from '../../../hocs/withInitialCall';
import withLogin from '../../../hocs/withLogin';

const { LOADING } = progressValues;

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapPreviousAuthDataToProps = (data) => ({
  encryptedWIF: data && data.encryptedWIF
});

export default compose(
  withInitialCall(previousAuthActions),
  withProgressComponents(previousAuthActions, {
    [LOADING]: Loading
  }, {
    strategy: alreadyLoadedStrategy
  }),
  withData(previousAuthActions, mapPreviousAuthDataToProps),

  withState('encryptedWIF', 'setEncryptedWIF', (props) => props.encryptedWIF || ''),
  withState('passphrase', 'setPassphrase', ''),

  // store encryptedWIF on login so we can quickly authenticate again next time the app launches
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),
  withLogin((data, props) => props.setLastLogin({ encryptedWIF: props.encryptedWIF })),

  // redirect on login
  withRouter,
  withLogin((data, { history }) => history.push('/'))
)(LoginFormPassphrase);
