import { compose } from 'recompose';
import { withActions } from 'spunky';

import Login from './Login';
import authActions from '../../actions/authActions';
import withAuthError from '../../hocs/withAuthError';

const mapAuthActionsToProps = (actions) => ({
  login: ({ wif, passphrase, encryptedWIF, publicKey }) => {
    return actions.call({ wif, passphrase, encryptedWIF, publicKey });
  }
});

export default compose(
  withActions(authActions, mapAuthActionsToProps),
  withAuthError
)(Login);
