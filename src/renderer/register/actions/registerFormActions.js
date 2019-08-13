import { createActions } from 'spunky';
import { isEmpty } from 'lodash';
import * as bip39 from 'bip39';

import simpleEncrypt from 'shared/util/simpleEncrypt';
import { getStorage } from 'shared/lib/storage';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import { ID as ACCOUNT_ID } from 'auth/actions/accountActions';

const MIN_PASSPHRASE_LEN = 6;

export const ID = 'registerForm';

/** // TODO
 * Password turned into SCrypt SHA256 hash.
 * Hash turned into bip39 mnemonic
 * Mnemonic turned into bip39 seed hex
 * Seed hex is then used to encrypt/decrypt things
 */
export const validateAndStoreFormData = async (data) => {
  const { accountLabel, passphrase, passphraseConfirm, secretWord } = data;

  const accounts = await getStorage(ACCOUNT_ID);
  const newAccount = accounts[accountLabel];

  if (!isEmpty(newAccount)) {
    throw new Error(`Account with label ${accountLabel} already exists.`);
  }

  if (passphrase.length < MIN_PASSPHRASE_LEN) {
    throw new Error('Passphrase is too short.');
  }

  if (passphrase !== passphraseConfirm) {
    throw new Error('Passphrase verification does not match.');
  }

  if (isEmpty(secretWord)) {
    throw new Error('Fill in a Secret Word.');
  }

  // Generate bip39 Mnemonic - 256-bits entropy (24-word long mnemonic)
  const mnemonic = bip39.generateMnemonic(256, null, bip39.wordlists[DEFAULT_LANGUAGE]);
  const encryptedMnemonic = simpleEncrypt(mnemonic, passphrase);
  return {
    ...data,
    mnemonic,
    encryptedMnemonic
  };
};

export default createActions(ID, (data) => {
  return () => validateAndStoreFormData(data);
});
