
import HardwareWallet from './NeoLedger';
import MnemonicWallet from './NeoMnemonic';

const Wallet = ({ wallet, seed }) => {
  if (wallet.isHardware) {
    return HardwareWallet({ wallet });
  } else {
    return MnemonicWallet({ wallet, seed });
  }
};

export default Wallet;
