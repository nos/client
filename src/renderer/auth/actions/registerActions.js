import { createActions } from 'spunky';
import { isEmpty } from 'lodash';
import bip39 from 'bip39';
import uuid from 'uuid/v4';

import simpleEncrypt from 'shared/util/simpleEncrypt';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { getStorage } from 'shared/lib/storage';
import { DEFAULT_NET } from 'values/networks';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import { DEFAULT_CHAIN, ETH } from 'shared/values/chains';

const MIN_PASSPHRASE_LEN = 1; // TODO set to 7

export const ID = 'registerFormData';
const ACCOUNT_ID = 'account';

/** // TODO
 * Password turned into SCrypt SHA256 hash.
 * Hash turned into bip39 mnemonic
 * Mnemonic turned into bip39 seed hex
 * Seed hex is then used to encrypt/decrypt things
 */

export const validateAndStoreFormData = async (data) => {
  const { accountLabel, passphrase, passphraseConfirmation, secretWord, isLedger } = data;

  if (passphrase.length < MIN_PASSPHRASE_LEN) {
    throw new Error('Passphrase is too short.');
  }

  if (passphrase !== passphraseConfirmation) {
    throw new Error('Passphrase verification does not match.');
  }

  const accounts = await getStorage(ACCOUNT_ID);
  const newAccount = accounts[accountLabel];

  if (!isEmpty(newAccount)) {
    throw new Error(`Account with label ${accountLabel} already exists.`);
  }

  if (isEmpty(secretWord)) {
    throw new Error('Fill in a Secret Word.');
  }

  if (!isLedger) {
    // Generate bip39 Mnemonic - 256-bits entropy (24-word long mnemonic)
    const mnemonic = bip39.generateMnemonic(256, null, bip39.wordlists[DEFAULT_LANGUAGE]);
    const encryptedMnemonic = simpleEncrypt(mnemonic, passphrase);
    return {
      ...data,
      mnemonic,
      encryptedMnemonic
    };
  }

  return data;
};

export default createActions(ID, (data) => {
  return () => validateAndStoreFormData(data);
});
