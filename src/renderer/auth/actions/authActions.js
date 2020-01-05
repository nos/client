import { createActions } from 'spunky';
import { omit } from 'lodash';

import { getActiveWalletForAccount } from 'shared/wallet/WalletHelpers';
import Wallet from 'shared/wallet';
import { ID as ACCOUNT_ID } from 'auth/actions/accountActions';
import { updateStorage } from 'shared/lib/storage';

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

const changeActiveWallet = async ({ account, passphrase, walletId }) => {
  const updatedAccount = {
    ...omit(account, 'wallet'),
    activeWalletId: walletId
  };

  await updateStorage(ACCOUNT_ID, account.accountLabel, updatedAccount);

  return authenticate({ account: updatedAccount, passphrase });
};

// Change active wallet
export const changeActiveWalletActions = createActions(ID, (data) => async () => {
  return changeActiveWallet(data);
});

export default createActions(ID, (data) => {
  return () => authenticate(data);
});
