import { compose } from 'recompose';
import { withActions } from 'spunky';

import Login from './Login';
import authActions from '../../actions/authActions';

const mapAuthActionsToProps = ({ call }) => ({
  onLogin: ({ wif, passphrase, encryptedWIF }) => call({ wif, passphrase, encryptedWIF })
});

export default compose(
  withActions(authActions, mapAuthActionsToProps)
)(Login);
