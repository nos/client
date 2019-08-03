import { deriveChild } from 'shared/wallet/common/BIP44';

import HardwareWallet from './Hardware';
import SoftwareWallet from './Software';

const Wallet = ({ wallet, seed }) => {
  if (wallet.isHardware) {
    return HardwareWallet({ wallet });
  } else {
    // TODO perhaps use ARKs crypto-hdwallet class
    // instead of derviceChild and softwareWallet
    const child = deriveChild({ wallet, seed });
    return new SoftwareWallet(child).getWallet();
  }
};

export default Wallet;
