import { createActions } from 'spunky';

import { DEFAULT_NET } from 'values/networks';

import { getStorage, setStorage } from 'shared/lib/storage';

export const ID = 'auth';

const defaultState = {
  authenticated: false
};

// Setters
export const setAuthData = createActions(
  ID,
  ({ wif, passphrase, encryptedWIF, publicKey }) => async () => {
    // await setStorage(ID, { wif, passphrase, encryptedWIF, publicKey });
    return { ...defaultState };
  }
);

// Getters
export default createActions(ID, () => async () => {
  return { ...defaultState };
});
