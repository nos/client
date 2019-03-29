import { createActions } from 'spunky';
import bip39 from 'bip39';
import { reduce, attempt, isError } from 'lodash';

import Wallet from 'auth/util/Wallet';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';

export const ID = 'auth';

const authenticate = async ({ account, passphrase }) => {
  const mnemonic = attempt(
    simpleDecrypt,
    account.encryptedMnemonic,
    passphrase
  );

  // Validate mnemnoic
  if (
    isError(mnemonic) ||
    !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])
  ) {
    throw new Error(
      'Invalid mnemonic. Please make sure you entered the correct password.'
    );
  }

  // Deterministically generate a 512 bit seed hex seed
  const seed = bip39.mnemonicToSeed(mnemonic, passphrase);
  const wallet = new Wallet(seed);

  const instances = reduce(
    account.accounts,
    (acumm, acc) => ({
      ...acumm,
      [acc.accountId]: wallet.deriveWalletFromAccount(acc)
    }),
    {}
  );

  return { ...account, instances };
};

export default createActions(ID, (data) => {
  return () => authenticate(data);
});
