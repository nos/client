import { createActions } from 'spunky';

import { getActiveWalletForAccount } from 'auth/util/Wallet/WalletHelpers';
import Wallet from 'auth/util/Wallet';

export const ID = 'auth';

const authenticate = async ({ account, passphrase }) => {
  const { encryptedMnemonic } = account;

  const walletForAccount = await getActiveWalletForAccount(account);
  const initializedWallet = Wallet({
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
