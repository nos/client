import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import { withErrorToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
// import createAccountActions from 'auth/actions/createAccountActions';
import registerActions from 'auth/actions/registerActions';

import RegisterForm from './RegisterForm';

const { FAILED, LOADED } = progressValues;

const mapRegisterActionsToProps = (actions) => ({
  storeFormData: (data) => {
    return actions.call(data);
  }
});

export default compose(
  withActions(registerActions, mapRegisterActionsToProps),
  withLoadingProp(registerActions, { strategy: pureStrategy }),

  withState('accountLabel', 'setAccountLabel', Math.random().toString()),
  withState('passphrase', 'setPassphrase', 'q'),
  withState('passphraseConfirmation', 'setPassphraseConfirmation', 'q'),
  withState('secretWord', 'setSecretWord', 'MySercetWord'),
  withState('isLedger', 'setIsLedger', false),
  withErrorToast(),
  withProgressChange(registerActions, FAILED, (state, props) => {
    props.showErrorToast(`Account creation failed: ${state.error}`);
  }),
  withProgressChange(registerActions, LOADED, (state, props) => {
    props.nextStep();
  })
)(RegisterForm);
