import { wallet } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

import { signWithLedger } from '../util/ledger';

export const ID = 'auth';

const wifAuthenticate = (wif) => {
  if (!wallet.isWIF(wif) && !wallet.isPrivateKey(wif)) {
    throw new Error('That is not a valid private key.');
  }

  const account = new wallet.Account(wif);

  return { wif: account.WIF, address: account.address };
};

const nep2Authenticate = async (passphrase, encryptedWIF) => {
  if (!wallet.isNEP2(encryptedWIF)) {
    throw new Error('That is not a valid encrypted key.');
  }

  const wif = await wallet.decryptAsync(encryptedWIF, passphrase);
  const account = new wallet.Account(wif);

  return { wif: account.WIF, address: account.address };
};

const ledgerAuthenticate = (publicKey) => {
  const publicKeyEncoded = wallet.getPublicKeyEncoded(publicKey);
  const account = new wallet.Account(publicKeyEncoded);

  return { publicKey, address: account.address, signingFunction: signWithLedger };
};

export default createActions(ID, ({ wif, passphrase, encryptedWIF, publicKey }) => async () => {
  if (wif) {
    return wifAuthenticate(wif);
  } else if (passphrase || encryptedWIF) {
    return nep2Authenticate(passphrase, encryptedWIF);
  } else if (publicKey) {
    return ledgerAuthenticate(publicKey);
  } else {
    throw new Error('Invalid login attempt.');
  }
});
