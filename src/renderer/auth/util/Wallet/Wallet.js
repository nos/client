import { attempt, isError } from 'lodash';
import bip39 from 'bip39';

import NeoWallet from "auth/util/Wallet/NEO";
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import simpleDecrypt from 'shared/util/simpleDecrypt';

import { NEO } from 'shared/values/chains';


const Wallet = ({ encryptedMnemonic, passphrase, wallet }) => {
  const mnemonic = attempt(simpleDecrypt, encryptedMnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error('Please make sure you\'ve entered the correct password.');
  }

  const seed = bip39.mnemonicToSeed(mnemonic, passphrase);

  const { chainId } = wallet;
  switch (chainId) {
    case NEO:
      return NeoWallet({ wallet, seed });
    default:
      throw new Error('Coin not supported.');
  }
};

export default Wallet;

// const MnemonicWallet = (storageWallet, seed) => {
//   const { type, account, change, index } = storageWallet;
//   if (!includes(CHAIN_IDS, type)) throw new Error('No valid chain type was given.');

//   // Deterministically create a bip32 master key
//   // which can be used to create child keys in the manner specified by bip44.
//   const root = bip32.fromSeed(seed);
//   const child = root
//     .deriveHardened(44) // Purpose (bip44)
//     .deriveHardened(type) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
//     .deriveHardened(account) // Account (different account levels)
//     .derive(change) // Change (0 = external/public view, 1 = internal chain/private view)
//     .derive(index); // Address index

//   switch (type) {
//     case NEO:
//       return neoMnemonicWallet(storageWallet, child);
//     default:
//       throw new Error('Wrong type');
//   }
// };

// const HardwareWallet = (storageWallet) => {
//   const { type } = storageWallet;

//   switch (type) {
//     case NEO:
//       return neoHardwareWallet(storageWallet);
//     default:
//       throw new Error('Wrong type');
//   }
// };
