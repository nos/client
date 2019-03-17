import { createActions } from 'spunky';
import bip39 from 'bip39';
import bip32 from 'bip32';

import simpleDecrypt from 'shared/util/simpleDecrypt';
import PROFILE_ID from 'shared/values/profile';
import { getStorage } from 'shared/lib/storage';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';

import Wallet from '../util/Wallet';

export const ID = 'auth';

const authenticate = async (profile, passphrase, secretWord) => {
  try {
    const mnemonic = simpleDecrypt(profile.mnemonic, passphrase);

    console.log('men', mnemonic);
    console.log('qweqwe', passphrase);
    console.log('profile', profile.mnemonic);
    // Validate mnemnoic
    if (!bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
      throw new Error('Invalid mnemonic.');
    }

    // Deterministically generate a 512 bit seed hex seed
    const seed = bip39.mnemonicToSeed(mnemonic, passphrase);
    const seed2 = bip39.mnemonicToSeed(mnemonic, 'DIKKE');

    console.log('seed', seed);
    console.log('seed2', seed2);

    // Deterministically create a bip32 master key
    // which can be used to create child keys in the manner specified by bip44.
    const root = bip32.fromSeed(seed);

    const wallet = new Wallet(root);
    console.log('{ ...profile, passphrase, wallet }', { ...profile, passphrase, wallet });
    return;
    return { ...profile, passphrase, wallet };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default createActions(ID, ({ profile, passphrase, secretWord, ...rest }) => {
  console.log('rest', rest);
  return () => authenticate(profile, passphrase, secretWord);
});
