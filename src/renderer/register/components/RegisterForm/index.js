import { compose, withState } from 'recompose';
import { progressValues } from 'spunky';

import withErrorToast from 'shared/hocs/withErrorToast';
import withProgressChange from 'shared/hocs/withProgressChange';

import RegisterForm from './RegisterForm';
import createAccountActions from '../../actions/createAccountActions';

const { FAILED } = progressValues;

export default compose(
  withState('passphrase', 'setPassphrase', ''),
  withState('passphraseConfirmation', 'setPassphraseConfirmation', ''),
  withErrorToast(),
  withProgressChange(createAccountActions, FAILED, (state, props) => {
    props.showToast(`Account creation failed: ${state.error}`);
  })
)(RegisterForm);
