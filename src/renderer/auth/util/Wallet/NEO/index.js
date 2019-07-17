import { deriveChild } from 'auth/util/Wallet/common/BIP44';

import HardwareWallet from './NeoLedger';
import MnemonicWallet from './NeoMnemonic';

// TODO transform HW wallet also to a class??
const Wallet = ({ wallet, seed }) => {
  if (wallet.isHardware) {
    return HardwareWallet({ wallet });
  } else {
    const child = deriveChild({ wallet, seed });
    return new MnemonicWallet(child).getWallet();
  }
};

export default Wallet;
