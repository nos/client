import { wallet } from '@cityofzion/neon-js';
import { includes } from 'lodash';

import NeoWallet from 'auth/util/Wallet/NEO';
import { COIN_TYPES, NEO, ETH } from 'shared/values/coins';

const deriveWallet = (coinType, index, account = 0, change = 0) => {
  if (!includes(COIN_TYPES, coinType)) throw new Error('No valid coin type was given.');

  return this.root
    .deriveHardened(44) // Purpose (bip44)
    .deriveHardened(coinType) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    .deriveHardened(account) // Account (different account levels)
    .derive(change) // Change (0 = external/public view, 1 = internal chain/private view)
    .derive(index); // Address index
};

const getMnemonicWallet = ({ coinType, index, account = 0, change = 0 }) => {
  const derivedWallet = this.deriveWallet(coinType, index, account, change);
  switch (coinType) {
    case NEO:
      return NeoWallet(derivedWallet);
    case ETH:
      return NeoWallet(derivedWallet);
    default:
      throw new Error('Invalid coin type.');
  }
};

// TODO IS THIS FILE USED???
const getHardwareWallet = ({ coinType, index, account = 0, change = 0 }) => {
  const derivedWallet = this.deriveWallet(coinType, index, account, change);
  switch (coinType) {
    case NEO:
      return NeoWallet(derivedWallet);
    case ETH:
      return NeoWallet(derivedWallet);
    default:
      throw new Error('Invalid coin type.');
  }
};


const publicKeyToAddress = (publicKey) => {
  const encodedKey = wallet.getPublicKeyEncoded(publicKey);

  return new wallet.Account(encodedKey).address;
};

export { publicKeyToAddress, getHardwareWallet, getMnemonicWallet, deriveWallet };
