import { includes } from 'lodash';

import CHAINS from 'shared/values/chains';

import EthWallet from './EthWallet';
import NeoWallet from './NeoWallet';

export default class Wallet {
  constructor(root) {
    this.root = root;
    this.neoWallet = this.getNeoWallet(0);
    this.ethWallet = this.getEthWallet(0);
  }

  deriveWallet = (chain, index, account = 0, change = 0) => {
    if (!includes(CHAINS, chain)) throw new Error('No valid chain was given.');

    return this.root
      .deriveHardened(44) // Purpose (bip44)
      .deriveHardened(chain) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
      .deriveHardened(account) // Account (different account levels)
      .derive(change) // Change (0 = external/public view, 1 = internal chain/private view)
      .derive(index); // Address index
  };

  deriveWalletFromAccount = ({ chainId, index, account = 0, change = 0 }) => {
    const derivedWallet = this.deriveWallet(chainId, index, account, change);
    switch (chainId) {
      case CHAINS.NEO:
        return new NeoWallet(derivedWallet).getWallet();
      case CHAINS.ETH:
        return new EthWallet(derivedWallet).getWallet();
      default:
        throw new Error('Invalid chainId.');
    }
  };

  setEthWallet = (wallet) => {
    this.ethWallet = wallet;
  };

  setNeoWallet = (wallet) => {
    this.neoWallet = wallet;
  };

  getEthWallet = (index, account = 0, change = 0) => {
    const child = this.deriveWallet(CHAINS.ETH, index, account, change);
    return new EthWallet(child).getWallet();
  };

  getNeoWallet = (index, account = 0, change = 0) => {
    const child = this.deriveWallet(CHAINS.NEO, index, account, change);
    return new NeoWallet(child).getWallet();
  };
}
