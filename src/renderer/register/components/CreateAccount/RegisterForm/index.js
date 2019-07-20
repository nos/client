import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import { withErrorToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import registerFormActions from 'register/actions/registerFormActions';

import RegisterForm from './RegisterForm';

const { FAILED, LOADED } = progressValues;

const mapRegisterActionsToProps = (actions) => ({
  storeFormData: (data) => actions.call(data)
});

export default compose(
  withActions(registerFormActions, mapRegisterActionsToProps),
  withLoadingProp(registerFormActions, { strategy: pureStrategy }),

  withState('accountLabel', 'setAccountLabel', Math.random().toString()),
  withState('passphrase', 'setPassphrase', 'q'),
  withState('passphraseConfirm', 'setPassphraseConfirm', 'q'),
  withState('secretWord', 'setSecretWord', 'MySercetWord'),
  withState('isHardware', 'setIsHardware', false),
  withErrorToast(),
  withProgressChange(registerFormActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),
  withProgressChange(registerFormActions, LOADED, (state, props) => {
    props.nextStep();
  })
)(RegisterForm);
