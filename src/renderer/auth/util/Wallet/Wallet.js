import { includes } from 'lodash';
import bip32 from 'bip32';

import { NEO, ETH, CHAIN_IDS } from 'shared/values/chains';

import { neoHardwareWallet, neoMnemonicWallet } from './NeoWallets';

const MnemonicWallet = (storageWallet, seed) => {
  const { type, account, change, index } = storageWallet;
  if (!includes(CHAIN_IDS, type)) throw new Error('No valid chain type was given.');

  // Deterministically create a bip32 master key
  // which can be used to create child keys in the manner specified by bip44.
  const root = bip32.fromSeed(seed);
  const child = root
    .deriveHardened(44) // Purpose (bip44)
    .deriveHardened(type) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    .deriveHardened(account) // Account (different account levels)
    .derive(change) // Change (0 = external/public view, 1 = internal chain/private view)
    .derive(index); // Address index

  switch (type) {
    case NEO:
      return neoMnemonicWallet(storageWallet, child);
    default:
      throw new Error('Wrong type');
  }
};

const HardwareWallet = (storageWallet) => {
  const { type } = storageWallet;

  switch (type) {
    case NEO:
      return neoHardwareWallet(storageWallet);
    default:
      throw new Error('Wrong type');
  }
};

export { HardwareWallet, MnemonicWallet };
