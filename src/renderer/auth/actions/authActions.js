import { createActions } from 'spunky';

import { getActiveWalletForAccount, initializeWallet } from 'auth/util/StorageWallet/WalletHelpers';

export const ID = 'auth';

const authenticate = async ({ account, passphrase }) => {
  const { encryptedMnemonic } = account;

  const walletForAccount = await getActiveWalletForAccount(account);
  const initializedWallet = initializeWallet({
    encryptedMnemonic,
    passphrase,
    wallet: walletForAccount
  });

  return {
    ...account,
    wallet: initializedWallet
  };
};

export default createActions(ID, ({ account, passphrase }) => {
  return () => authenticate({ account, passphrase });
});
