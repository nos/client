import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import withImmediateReset from 'shared/hocs/withImmediateReset';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withErrorToast from 'shared/hocs/withErrorToast';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import withProgressChange from 'shared/hocs/withProgressChange';

import RegisterForm from './RegisterForm';
import createAccountActions from '../../actions/createAccountActions';

const { FAILED } = progressValues;

const mapAccountActionsToProps = (actions) => ({
  onRegister: ({ passphrase, passphraseConfirmation }) => {
    return actions.call({ passphrase, passphraseConfirmation });
  }
});

export default compose(
  withImmediateReset(createAccountActions),
  withActions(createAccountActions, mapAccountActionsToProps),
  withLoadingProp(createAccountActions, { strategy: pureStrategy }),

  withState('passphrase', 'setPassphrase', ''),
  withState('passphraseConfirmation', 'setPassphraseConfirmation', ''),
  withErrorToast(),
  withProgressChange(createAccountActions, FAILED, (state, props) => {
    props.showToast(`Account creation failed: ${state.error}`);
  })
)(RegisterForm);
