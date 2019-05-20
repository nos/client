import { includes, attempt, isError } from 'lodash';
import bip32 from 'bip32';
import bip39 from 'bip39';

import { NEO, ETH, CHAIN_IDS } from 'shared/values/chains';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import simpleDecrypt from 'shared/util/simpleDecrypt';

import EthWallet from './ETH/EthWallet';
import NeoWallet from './NEO/NeoWallet';

export default class Wallet {
  constructor(encryptedMnemonic, passphrase) {
    const mnemonic = attempt(simpleDecrypt, encryptedMnemonic, passphrase);

    // Validate mnemnoic
    if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
      throw new Error('Please make sure you entered the correct password.');
    }

    // Deterministically generate a 512 bit seed hex seed
    const seed = bip39.mnemonicToSeed(mnemonic, passphrase);

    // Deterministically create a bip32 master key
    // which can be used to create child keys in the manner specified by bip44.
    this.root = bip32.fromSeed(seed);
  }

  deriveWallet = (chain, index, account = 0, change = 0) => {
    if (!includes(CHAIN_IDS, chain)) throw new Error('No valid chain was given.');

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
      case NEO:
        return new NeoWallet(derivedWallet, index).getWallet();
      case ETH:
        return new EthWallet(derivedWallet, index).getWallet();
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
    const child = this.deriveWallet(ETH, index, account, change);
    return new EthWallet(child).getWallet();
  };

  getNeoWallet = (index, account = 0, change = 0) => {
    const child = this.deriveWallet(NEO, index, account, change);
    return new NeoWallet(child).getWallet();
  };
}
