import uuid from 'uuid/v4';
import { isEmpty, omit, reduce, filter } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { DEFAULT_NET } from 'values/networks';
import { DEFAULT_COIN } from 'shared/values/coins';

import Wallet from './Wallet';

export const ID = 'wallets';
const walletFilterProps = ['signingFunction', 'WIF', 'privateKey'];

const newStorageWallet = ({
  isHardware,
  canDelete = true,
  coinType = DEFAULT_COIN,
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
    coinType,
    account,
    change,
    net,
    publicKey // present with hardware wallets
  };

  return storageWallet;
};

const storeWalletForAccount = async ({ accountLabel, wallet }) => {
  const { label } = wallet;
  const walletId = `${ID}-${accountLabel}`;

  const wallets = await getStorage(walletId);
  if (!isEmpty(wallets[label])) {
    throw new Error(`Wallet with label ${label} for account ${accountLabel} already exists.`);
  }

  await setStorage(walletId, {
    ...wallets,
    [label]: omit(wallet, walletFilterProps)
  });
};

const getWalletsForAccount = ({ accountLabel }) => getStorage(`${ID}-${accountLabel}`);

const getActiveWalletForAccount = async ({ accountLabel, activeWalletId }) => {
  const wallets = await getWalletsForAccount({ accountLabel });

  const activeWalletForAccount = wallets[activeWalletId];
  if (isEmpty(activeWalletForAccount)) {
    throw new Error(`Active wallet for account ${accountLabel} doesn't exist.`);
  }

  return activeWalletForAccount;
};

const addWalletToAccount = async ({ account, passphrase, options }) => {
  // TODO before 0.6 insert publicKey into options instead of having it live on the account object
  const { encryptedMnemonic, accountLabel, isHardware, publicKey } = account;

  const existingWallets = await getWalletsForAccount({ accountLabel });
  const latestAccount = reduce(
    filter(existingWallets, {
      coinType: options.coinType
    }),
    (max, obj) => {
      return obj.index > max.index ? obj : max;
    }
  ) || { index: -1 };

  // Create "dull" wallet with options - TODO remove ?
  const wallet = newStorageWallet({
    ...options,
    isHardware,
    publicKey,
    index: latestAccount.index + 1
  });

  // Initialize a "dull"/storage wallet for an account
  const initializedWallet = Wallet({ encryptedMnemonic, passphrase, wallet });

  // Store either a "dull" or active wallet for an account
  await storeWalletForAccount({ accountLabel, wallet: initializedWallet });

  return initializedWallet;
};

export {
  addWalletToAccount,
  newStorageWallet,
  storeWalletForAccount,
  getWalletsForAccount,
  getActiveWalletForAccount
};
