import { includes } from 'lodash';
import bip32 from 'bip32';

import { NEO, ETH, CHAIN_IDS } from 'shared/values/chains';

import EthWallet from '../ETH/EthWallet';
import NeoWallet from '../NEO/NeoWallet';

export default class Wallet {
  constructor(seed) {
    // Deterministically create a bip32 master key
    // which can be used to create child keys in the manner specified by bip44.
    this.root = bip32.fromSeed(seed);
  }

  deriveWallet = (type, index, account = 0, change = 0) => {
    if (!includes(CHAIN_IDS, type)) throw new Error('No valid chain type was given.');

    return this.root
      .deriveHardened(44) // Purpose (bip44)
      .deriveHardened(type) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
      .deriveHardened(account) // Account (different account levels)
      .derive(change) // Change (0 = external/public view, 1 = internal chain/private view)
      .derive(index); // Address index
  };

  deriveWalletFromAccount = ({ type, index, account = 0, change = 0 }) => {
    const derivedWallet = this.deriveWallet(type, index, account, change);
    switch (type) {
      case NEO:
        return new NeoWallet(derivedWallet, index).getWallet();
      case ETH:
        return new EthWallet(derivedWallet, index).getWallet();
      default:
        throw new Error('Invalid chain type.');
    }
  };

  setEthWallet = (wallet) => {
    this.ethWallet = wallet;
  };

  setNeoWallet = (wallet) => {
    this.neoWallet = wallet;
  };

  getEthWallet = (index, account = 0, change = 0) => {
    const child = this.deriveWallet(ETH, index, account, change);
    return new EthWallet(child).getWallet();
  };

  getNeoWallet = (index, account = 0, change = 0) => {
    const child = this.deriveWallet(NEO, index, account, change);
    return new NeoWallet(child).getWallet();
  };
}
