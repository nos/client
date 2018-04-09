import { compose, withState } from 'recompose';

import RegisterForm from './RegisterForm';

export default compose(
  withState('passphrase', 'setPassphrase', ''),
  withState('passphraseConfirmation', 'setPassphraseConfirmation', '')
)(RegisterForm);
