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

const changeActiveWallet = ({ account, passphrase, walletId }) => {
  const updatedAccount = {
    ...account,
    activeWalletId: walletId
  };

  return authenticate({ account: updatedAccount, passphrase });
};

// Change active wallet
export const changeActiveWalletActions = createActions(ID, (data) => async () => {
  return changeActiveWallet(data);
});

export default createActions(ID, (data) => {
  return () => authenticate(data);
});
