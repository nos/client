import { withActions } from 'spunky';

import Login from './Login';
import authActions from '../../actions/authActions';

const mapAuthActionsToProps = (actions) => ({
  login: ({ wif, passphrase, encryptedWIF, publicKey }) => {
    return actions.call({ wif, passphrase, encryptedWIF, publicKey });
  }
});

export default withActions(authActions, mapAuthActionsToProps)(Login);
