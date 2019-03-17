import { includes } from 'lodash';

import EthWallet from './EthWallet';
import NeoWallet from './NeoWallet';

const networks = {
  BTC: 0,
  NEO: 888,
  ETH: 60
};

export default class Wallet {
  constructor(root) {
    this.root = root;
    this.neoWallet = this.getNeoWallet(0);
    this.ethWallet = this.getEthWallet(0);
  }

  deriveWallet = (network, index, account, change) => {
    if (!includes(networks, network)) throw new Error('No valid network was given.');

    return this.root
      .deriveHardened(44) // Purpose (bip44)
      .deriveHardened(network) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
      .deriveHardened(account) // Account (different account levels)
      .derive(change) // Change (0 = external, 1 = internal chain)
      .derive(index); // Address index
  };

  setEthWallet = (wallet) => {
    this.ethWallet = wallet;
  };

  setNeoWallet = (wallet) => {
    this.neoWallet = wallet;
  };

  getEthWallet = (index, account = 0, change = 0) => {
    const child = this.deriveWallet(networks.ETH, index, account, change);
    return new EthWallet(child).getWallet();
  };

  getNeoWallet = (index, account = 0, change = 0) => {
    const child = this.deriveWallet(networks.NEO, index, account, change);
    return new NeoWallet(child).getWallet();
  };
}
