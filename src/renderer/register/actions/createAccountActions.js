import { wallet } from '@cityofzion/neon-js';
import { createActions } from 'spunky';
import { some } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';

const MIN_PASSPHRASE_LEN = 4;

export const ID = 'createAccount';
export const profileID = 'profiles_v1';

export default createActions(
  ID,
  ({ walletName, passphrase, passphraseConfirmation }) => async () => {
    if (passphrase.length < MIN_PASSPHRASE_LEN) {
      throw new Error('Passphrase is too short.');
    }

    if (passphrase !== passphraseConfirmation) {
      throw new Error('Passphrase verification does not match.');
    }

    const { profiles } = await getStorage(profileID);

    const exists = some(profiles, (profile) => profile.walletName === walletName);
    if (exists) {
      throw new Error(`Wallet name "${walletName}" already exists in storage.`);
    }

    const key = wallet.generatePrivateKey();
    const account = new wallet.Account(key);
    const encryptedKey = await wallet.encryptAsync(key, passphrase);

    return { walletName, key, encryptedKey, passphrase, address: account.address };
  }
);
