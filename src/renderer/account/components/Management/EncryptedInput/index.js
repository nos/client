import { compose, withState } from 'recompose';
import { withData } from 'spunky';

import withConfirm from 'shared/hocs/withConfirm';
import { withErrorToast } from 'shared/hocs/withToast';

import EncryptedInput from './EncryptedInput';

export default compose(
  withConfirm(),
  withErrorToast(),
  withState('passphrase', 'setPassphrase', ''),
  withState('data', 'setData', ({ encryptedData }) => encryptedData),
)(EncryptedInput);
