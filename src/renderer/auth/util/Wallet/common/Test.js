import { wallet } from '@cityofzion/neon-js';
import { includes } from 'lodash';

import NeoWallet from 'auth/util/Wallet/NEO';
import { CHAIN_IDS, NEO, ETH } from 'shared/values/chains';

const deriveWallet = (type, index, account = 0, change = 0) => {
  if (!includes(CHAIN_IDS, type)) throw new Error('No valid chain type was given.');

  return this.root
    .deriveHardened(44) // Purpose (bip44)
    .deriveHardened(type) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    .deriveHardened(account) // Account (different account levels)
    .derive(change) // Change (0 = external/public view, 1 = internal chain/private view)
    .derive(index); // Address index
};

const getMnemonicWallet = ({ type, index, account = 0, change = 0 }) => {
  const derivedWallet = this.deriveWallet(type, index, account, change);
  switch (type) {
    case NEO:
      return NeoWallet(derivedWallet);
    case ETH:
      return NeoWallet(derivedWallet);
    default:
      throw new Error('Invalid chain type.');
  }
};

const getHardwareWallet = ({ type, index, account = 0, change = 0 }) => {
  const derivedWallet = this.deriveWallet(type, index, account, change);
  switch (type) {
    case NEO:
      return NeoWallet(derivedWallet);
    case ETH:
      return NeoWallet(derivedWallet);
    default:
      throw new Error('Invalid chain type.');
  }
};


const publicKeyToAddress = (publicKey) => {
  const encodedKey = wallet.getPublicKeyEncoded(publicKey);

  return new wallet.Account(encodedKey).address;
};

export { publicKeyToAddress, getHardwareWallet, getMnemonicWallet, deriveWallet };
