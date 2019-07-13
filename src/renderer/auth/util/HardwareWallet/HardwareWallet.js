
import { NEO, ETH } from 'shared/values/chains';

import { signWithLedger } from '../NEO/NeoLedger';
import NeoMnemonicWallet from '../NEO/NeoWallet';
import EthMnemonicWallet from '../ETH/EthWallet';


import { publicKeyToAddress } from '../NEO/Utils';
import MnemonicWallet from '../MnemonicWallet/MnemonicWallet';

// TODO extract
const NewNeoHardwareWallet = (currentWallet) => {
  const { publicKey } = currentWallet;
  const address = publicKeyToAddress(publicKey);

  return {
    publicKey,
    address,
    signingFunction: signWithLedger
  };
};

// TODO make generic
export const hardwareWallet = ({ wallet }) => {
  const { publicKey } = wallet;
  const address = publicKeyToAddress(publicKey);

  return {
    ...wallet,
    publicKey,
    address,
    signingFunction: signWithLedger
  };
};

// TODO move this to common wallet
const newWalletInstance = (wallet, seed) => {
  const { isHardware } = wallet;

  if (isHardware) {
    // TODO return new hardware wallet instance - which is dynamic
    return NewNeoHardwareWallet(wallet);
  } else if (!isHardware && seed) {
    // TODO return new mnemonicWallet instance - which is dynamic
    return new MnemonicWallet(seed).deriveWalletFromAccount(wallet);
  } else {
    throw new Error('No seed given for Mnemonic wallet');
  }
  //   switch (type) {
  //     case NEO:
  //       return isHardware ? new NeoHardwareWallet(wallet) : new NeoMnemonicWallet();
  //     case ETH:
  //       return isHardware // TODO replace NeoHardwareWallet with EthHardwareWallet
  //         ? new NeoHardwareWallet()
  //         : new EthMnemonicWallet();
  //     default:
  //       throw new Error('Incorrect wallet type.');
  //   }
};


export default newWalletInstance;
