import { wallet } from '@cityofzion/neon-js';

import { NEO, ETH } from 'shared/values/chains';

import NeoHardwareWallet from '../NEO/NeoLedger';
import NeoMnemonicWallet from '../NEO/NeoWallet';
import EthMnemonicWallet from '../ETH/EthWallet';

import { signWithLedger } from '../NEO/NeoLedger';
import { publicKeyToAddress } from '../NEO/Utils';

const newWalletInstance = (wallet) => {
  const { type, isHardware } = wallet;
  return NewNeoHardwareWallet(wallet);
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

const NewNeoHardwareWallet = (currentWallet) => {
  const { publicKey } = currentWallet;
  const address = publicKeyToAddress(publicKey);

  return {
    publicKey,
    address,
    signingFunction: signWithLedger
  };
};

export default newWalletInstance;
