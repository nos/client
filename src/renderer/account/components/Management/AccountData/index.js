import { compose, withState } from 'recompose';

import withConfirm from 'shared/hocs/withConfirm';
import { withErrorToast } from 'shared/hocs/withToast';

import AccountData from './AccountData';

export default compose(
  withConfirm(),
  withErrorToast(),
  withState('passphrase', 'setPassphrase', ''),
  withState('mnemonic', 'setMnemonic', ({ encryptedMnemonic }) => encryptedMnemonic)
)(AccountData);
