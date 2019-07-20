import { compose, withState } from 'recompose';
import { withActions, progressValues, withData } from 'spunky';

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
const mapRegisterDataToProps = (data) => data;

export default compose(
  withActions(registerFormActions, mapRegisterActionsToProps),
  withLoadingProp(registerFormActions, { strategy: pureStrategy }),
  withData(registerFormActions, mapRegisterDataToProps),

  withState('accountLabel', 'setAccountLabel', ({ accountLabel }) => accountLabel || ''),
  withState('passphrase', 'setPassphrase', ''),
  withState('passphraseConfirm', 'setPassphraseConfirm', ''),
  withState('secretWord', 'setSecretWord', ({ secretWord }) => secretWord || ''),
  withState('isHardware', 'setIsHardware', false),
  withErrorToast(),
  withProgressChange(registerFormActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),
  withProgressChange(registerFormActions, LOADED, (state, props) => {
    props.nextStep();
  })
)(RegisterForm);
