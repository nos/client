import { compose, withState } from 'recompose';
import { withData } from 'spunky';

import withConfirm from 'shared/hocs/withConfirm';
import { withErrorToast } from 'shared/hocs/withToast';
import { DEFAULT_COIN } from 'shared/values/coins';

import authActions from 'auth/actions/authActions';

import EncryptedInput from './EncryptedInput';

const mapAuthDataToProps = (account) => ({ account });

// TODO Clean up
export default compose(
  withConfirm(),
  withErrorToast(),
  withState('passphrase', 'setPassphrase', ''),
  withState('chainType', 'setChainType', DEFAULT_COIN),
  withState('data', 'setData', ({ encryptedData }) => encryptedData),
  withData(authActions, mapAuthDataToProps),
)(EncryptedInput);
