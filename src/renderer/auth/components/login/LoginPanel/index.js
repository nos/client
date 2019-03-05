import { compose, withProps } from 'recompose';
import { withActions, withProgress, progressValues } from 'spunky';

import pureStrategy from 'shared/hocs/strategies/pureStrategy';

import authActions from 'auth/actions/authActions';
import withAuthError from 'auth/hocs/withAuthError';

import LoginPanel from './LoginPanel';

const { LOADING } = progressValues;

const mapAuthActionsToProps = (actions) => ({
  login: ({ wif, passphrase, encryptedWIF, publicKey }) => {
    return actions.call({ wif, passphrase, encryptedWIF, publicKey });
  }
});

export default compose(
  withActions(authActions, mapAuthActionsToProps),
  withProgress(authActions, { strategy: pureStrategy }),
  withProps((props) => ({ loading: props.progress === LOADING })),
  withAuthError
)(LoginPanel);
