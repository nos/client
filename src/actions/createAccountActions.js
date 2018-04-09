import { wallet } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

const MIN_PASSPHRASE_LEN = 4;

export const ID = 'createAccount';

export default createActions(ID, ({ passphrase, passphraseConfirmation }) => async () => {
  if (passphrase.length < MIN_PASSPHRASE_LEN) {
    throw new Error('Passphrase is too short.');
  }

  if (passphrase !== passphraseConfirmation) {
    throw new Error('Passphrase verification does not match.');
  }

  const key = wallet.generatePrivateKey();
  const account = new wallet.Account(key);
  const encryptedKey = await wallet.encryptAsync(key, passphrase);

  return { key, encryptedKey, passphrase, address: account.address };
});
