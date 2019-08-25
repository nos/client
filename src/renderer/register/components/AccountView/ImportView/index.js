import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import { withErrorToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import registerFormActions from 'register/actions/registerFormActions';

import ImportView from './ImportView';

const { FAILED, LOADED } = progressValues;

const emptyMnemonicWordArray = Array(24).fill('');

const mapRegisterActionsToProps = (actions) => ({
  storeFormData: (data) => actions.call(data)
});

export default compose(
  withActions(registerFormActions, mapRegisterActionsToProps),
  withLoadingProp(registerFormActions, { strategy: pureStrategy }),

  withState('mnemonic', 'setMnemonic', ({ mnemonic }) => mnemonic || emptyMnemonicWordArray),

  withErrorToast(),
  withProgressChange(registerFormActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),
  withProgressChange(registerFormActions, LOADED, (state, props) => {
    props.nextStep();
  })
)(ImportView);
