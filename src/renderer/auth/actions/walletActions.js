import { createActions } from 'spunky';

import { addWalletToAccount, getWalletsForAccount } from 'auth/util/StorageWallet/WalletHelpers';
import { getStorage } from 'shared/lib/storage';

export const ID = 'wallets';

// Getters
export default createActions(ID, ({ accountLabel }) => async () => {
  return getStorage(`${ID}-${accountLabel}`);
});

// Setter - Add new wallets
export const addWalletActions = createActions(ID, ({
  account,
  passphrase,
  coinType
}) => async () => {
  await addWalletToAccount({ account, passphrase, options: { coinType } });
  return getWalletsForAccount({ accountLabel: account.accountLabel });
});
