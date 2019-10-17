import { createActions } from 'spunky';

import {
  addWalletToAccount,
  getWalletsForAccount,
  importWalletToAccount,
  storeWalletForAccount
} from 'shared/wallet/WalletHelpers';
import { getStorage } from 'shared/lib/storage';

export const ID = 'wallets';

// Getters
export default createActions(ID, ({ accountLabel }) => async () => {
  return getWalletsForAccount({ accountLabel });
});

// Setter - Add new wallets
export const addWalletActions = createActions(
  ID,
  ({ account, passphrase, options }) => async () => {
    await addWalletToAccount({ account, passphrase, options });
    return getWalletsForAccount({ accountLabel: account.accountLabel });
  }
);

// Setter - Import new wallets
export const importWalletActions = createActions(
  ID,
  ({ account, passphrase, options }) => async () => {
    await importWalletToAccount({ account, passphrase, options });
    return getWalletsForAccount({ accountLabel: account.accountLabel });
  }
);

// Setter - Update Wallet
export const updateWalletActions = createActions(ID, ({ account, wallet }) => async () => {
  const { accountLabel } = account;
  await storeWalletForAccount({ accountLabel, wallet, update: true });
  return getWalletsForAccount({ accountLabel });
});
