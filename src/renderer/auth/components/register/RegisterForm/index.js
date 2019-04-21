import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import { withErrorToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import createAccountActions from 'auth/actions/createAccountActions';

import RegisterForm from './RegisterForm';

const { FAILED } = progressValues;

const mapAccountActionsToProps = (actions) => ({
  onRegister: (data) => {
    return actions.call(data);
  }
});

export default compose(
  withActions(createAccountActions, mapAccountActionsToProps),
  withLoadingProp(createAccountActions, { strategy: pureStrategy }),

  withState('label', 'setLabel', Math.random().toString()),
  withState('passphrase', 'setPassphrase', 'q'),
  withState('passphraseConfirmation', 'setPassphraseConfirmation', 'q'),
  withState('secretWord', 'setSecretWord', 'MySercetWord'),
  withErrorToast(),
  withProgressChange(createAccountActions, FAILED, (state, props) => {
    props.showErrorToast(`Account creation failed: ${state.error}`);
  })
)(RegisterForm);
