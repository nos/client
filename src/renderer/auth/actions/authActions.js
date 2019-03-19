import { createActions } from 'spunky';
import bip39 from 'bip39';
import bip32 from 'bip32';
import { attempt, isError } from 'lodash';

import simpleDecrypt from 'shared/util/simpleDecrypt';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';

import Wallet from '../util/Wallet';

export const ID = 'auth';

const authenticate = async (profile, passphrase) => {
  const mnemonic = attempt(simpleDecrypt, profile.mnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error('Invalid mnemonic. Please make sure you entered the correct password.');
  }

  // Deterministically generate a 512 bit seed hex seed
  const seed = bip39.mnemonicToSeed(mnemonic, passphrase);

  // Deterministically create a bip32 master key
  // which can be used to create child keys in the manner specified by bip44.
  const root = bip32.fromSeed(seed);

  // Create agnostic wallet, able to derive child wallets for each chain
  const wallet = new Wallet(root);

  console.log('{ ...profile, passphrase, wallet }', { ...profile, passphrase, wallet });
  return { ...profile, wallet };
};

export default createActions(ID, ({ profile, passphrase }) => {
  return () => authenticate(profile, passphrase);
});
