import { createActions } from 'spunky';

import { getActiveWalletForAccount } from 'shared/wallet/WalletHelpers';
import Wallet from 'shared/wallet';

export const ID = 'auth';

const authenticate = async ({ account, passphrase }) => {
  const { encryptedMnemonic } = account;

  const walletForAccount = await getActiveWalletForAccount(account);
  const initializedWallet = await Wallet({
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
