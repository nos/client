import { string, shape, bool } from 'prop-types';

import walletShape from './walletShape';

export default shape({
  accountLabel: string.isRequired,
  secretWord: string.isRequired,
  isHardware: bool.isRequired,
  encryptedMnemonic: string.isRequired,
  activeWalletId: string.isRequired,
  wallet: walletShape.isRequired
});
