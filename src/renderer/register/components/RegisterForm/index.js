import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import { withErrorToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';

import RegisterForm from './RegisterForm';
import createAccountActions from '../../actions/createAccountActions';

const { FAILED } = progressValues;

const mapAccountActionsToProps = (actions) => ({
  onRegister: ({ walletName, passphrase, passphraseConfirmation }) => {
    return actions.call({ walletName, passphrase, passphraseConfirmation });
  }
});

export default compose(
  withActions(createAccountActions, mapAccountActionsToProps),
  withLoadingProp(createAccountActions, { strategy: pureStrategy }),

  withState('walletName', 'setWalletName', ''),
  withState('passphrase', 'setPassphrase', ''),
  withState('passphraseConfirmation', 'setPassphraseConfirmation', ''),
  withErrorToast(),
  withProgressChange(createAccountActions, FAILED, (state, props) => {
    props.showErrorToast(`Account creation failed: ${state.error}`);
  })
)(RegisterForm);
