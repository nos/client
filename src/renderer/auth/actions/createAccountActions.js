import { createActions } from 'spunky';
import { isEmpty } from 'lodash';
import bip39 from 'bip39';
import uuid from 'uuid/v4';

import simpleEncrypt from 'shared/util/simpleEncrypt';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { getStorage } from 'shared/lib/storage';
import { DEFAULT_NET } from 'values/networks';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import CHAINS, { DEFAULT_CHAIN } from 'shared/values/chains';

const MIN_PASSPHRASE_LEN = 1; // TODO set to 7

export const ID = 'createAccount';
const ACCOUNT_ID = 'account';

/** // TODO
 * Password turned into SCrypt SHA256 hash.
 * Hash turned into bip39 mnemonic
 * Mnemonic turned into bip39 seed hex
 * Seed hex is then used to encrypt/decrypt things
 */

const createAccount = async ({
  label,
  passphrase,
  passphraseConfirmation,
  secretWord
}) => {
  if (passphrase.length < MIN_PASSPHRASE_LEN) {
    throw new Error('Passphrase is too short.');
  }

  if (passphrase !== passphraseConfirmation) {
    throw new Error('Passphrase verification does not match.');
  }

  const accounts = await getStorage(ACCOUNT_ID);
  const newAccount = accounts[label];

  if (!isEmpty(newAccount)) {
    throw new Error(`Account with label ${label} already exists.`);
  }

  // Generate bip39 Mnemonic - 256-bits entropy (24-word long mnemonic)
  const mnemonic = bip39.generateMnemonic(
    256,
    null,
    bip39.wordlists[DEFAULT_LANGUAGE]
  );
  const encryptedMnemonic = simpleEncrypt(mnemonic, passphrase);

  const activeAccountId = uuid();
  const ethAccountId = uuid();

  const account = {
    accountLabel: label,
    encryptedMnemonic,
    secretWord,
    passphrase, // Will be removed when persisting to storage
    mnemonic, // Will be removed when persisting to storage
    activeAccountId,
    accounts: {
      [activeAccountId]: {
        accountId: activeAccountId,
        chainId: DEFAULT_CHAIN,
        index: DEFAULT_ACC_INDEX,
        account: 0,
        change: 0,
        net: DEFAULT_NET
      },
      [ethAccountId]: {
        accountId: ethAccountId,
        chainId: CHAINS.ETH,
        index: DEFAULT_ACC_INDEX,
        account: 0,
        change: 0,
        net: DEFAULT_NET
      }
    }
  };

  return account;
};

export default createActions(ID, (data) => {
  return () => createAccount(data);
});
