import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import { withErrorToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import createProfileActions from 'auth/actions/createProfileActions';

import RegisterForm from './RegisterForm';

const { FAILED } = progressValues;

const mapAccountActionsToProps = (actions) => ({
  onRegister: ({ walletName, passphrase, passphraseConfirmation, secretWord }) => {
    return actions.call({ walletName, passphrase, passphraseConfirmation, secretWord });
  }
});

export default compose(
  withActions(createProfileActions, mapAccountActionsToProps),
  withLoadingProp(createProfileActions, { strategy: pureStrategy }),

  withState('walletName', 'setWalletName', Math.random().toString()),
  withState('passphrase', 'setPassphrase', 'qweqwe'),
  withState('passphraseConfirmation', 'setPassphraseConfirmation', 'qweqwe'),
  withState('secretWord', 'setSecretWord', 'MySercetWord'),
  withErrorToast(),
  withProgressChange(createProfileActions, FAILED, (state, props) => {
    props.showErrorToast(`Account creation failed: ${state.error}`);
  })
)(RegisterForm);
