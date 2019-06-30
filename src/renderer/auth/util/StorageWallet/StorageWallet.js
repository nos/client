import uuid from 'uuid/v4';
import { isEmpty } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { DEFAULT_NET } from 'values/networks';
import { DEFAULT_CHAIN } from 'shared/values/chains';

export const ID = 'wallets';

const newStorageWallet = ({
  isHardware,
  canDelete = true,
  type = DEFAULT_CHAIN,
  index = DEFAULT_ACC_INDEX,
  net = DEFAULT_NET,
  account = 0,
  change = 0,
  publicKey
}) => {
  const storageWallet = {
    label: uuid(),
    canDelete,
    isHardware,
    index,
    type,
    account,
    change,
    net,
    publicKey
  };

  return storageWallet;
};

const storeWallet = async (accountLabel, storageWallet) => {
  const { label } = storageWallet;

  const wallets = await getStorage(ID);
  if (!isEmpty(wallets[accountLabel])) {
    throw new Error(`Wallet for account ${accountLabel} already exists.`);
  }

  console.info(`storeWallet with label: ${accountLabel}-${label}`, storageWallet);

  await setStorage(ID, {
    [accountLabel]: {
      [label]: {
        ...storageWallet
      }
    }
  });
};

const getWalletsForAccount = async (accountLabel) => {
  const wallets = await getStorage(ID);
  if (isEmpty(wallets[accountLabel])) {
    throw new Error(`Wallet for account ${accountLabel} doesn't exists.`);
  }

  return wallets[accountLabel];
};

const getActiveWalletForAccount = async ({ accountLabel, activeWalletId }) => {
  const wallets = await getStorage(ID);

  const walletsForAccount = wallets[accountLabel];
  if (isEmpty(walletsForAccount)) {
    throw new Error(`Wallet for account ${accountLabel} doesn't exist.`);
  }

  const activeWalletForAccount = walletsForAccount[activeWalletId];

  if (isEmpty(activeWalletForAccount)) {
    throw new Error(`Active wallet for account ${accountLabel} doesn't exist.`);
  }

  return activeWalletForAccount;
};

const getWallets = async () => {
  return getStorage(ID);
};

export {
  newStorageWallet,
  getWallets,
  getWalletsForAccount,
  getActiveWalletForAccount,
  storeWallet
};
