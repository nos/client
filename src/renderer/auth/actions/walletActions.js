import { createActions } from 'spunky';

import { addWalletToAccount, getWalletsForAccount } from 'shared/wallet/WalletHelpers';

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
