import { deriveChild } from 'shared/wallet/common/BIP44';

import HardwareWallet from './NeoLedger';
import MnemonicWallet from './NeoMnemonic';

// TODO transform HW wallet also to a class??
const Wallet = ({ wallet, seed }) => {
  if (wallet.isImport) {
    return new MnemonicWallet({}).getWallet(wallet.privateKey);
  } else if (wallet.isHardware) {
    return HardwareWallet({ wallet });
  } else {
    const child = deriveChild({ wallet, seed });
    return new MnemonicWallet(child).getWallet();
  }
};

export default Wallet;
