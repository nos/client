import { v4 as uuid } from 'uuid';
import { isEmpty, omit, reduce, filter } from 'lodash';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

import { getStorage, setStorage } from 'shared/lib/storage';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { DEFAULT_NET } from 'values/networks';

import Wallet from './Wallet';

export const ID = 'wallets';
const walletFilterProps = ['signingFunction', 'wif', 'privateKey'];

const config = {
  length: 2,
  separator: ' ',
  style: 'capital',
  dictionaries: [colors, animals]
};

const newStorageWallet = ({
  isHardware,
  coinType, // coinType is required
  canDelete = true,
  index = DEFAULT_ACC_INDEX,
  net = DEFAULT_NET,
  account = 0,
  change = 0,
  walletLabel,
  publicKey,
  isImport = false
}) => {
  if (!coinType) {
    throw new Error('coinType is required.');
  }
  const storageWallet = {
    walletId: uuid(),
    walletLabel: walletLabel || uniqueNamesGenerator(config),
    canDelete,
    isHardware,
    index,
    coinType,
    account,
    change,
    net,
    isImport,
    publicKey // present with hardware wallets
  };

  return storageWallet;
};

const storeWalletForAccount = async ({
  accountLabel,
  wallet,
  omitItems = true,
  update = false
}) => {
  const { walletId } = wallet;
  const storageId = `${ID}-${accountLabel}`;

  const wallets = await getStorage(storageId);
  if (!update && !isEmpty(wallets[walletId])) {
    throw new Error(`Wallet with id ${walletId} for account ${accountLabel} already exists.`);
  }

  await setStorage(storageId, {
    ...wallets,
    [walletId]: omitItems ? omit(wallet, walletFilterProps) : wallet
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
  const { encryptedMnemonic, accountLabel } = account;
  const { coinType } = options;

  const existingWallets = await getWalletsForAccount({ accountLabel });
  const latestAccount = reduce(filter(existingWallets, { coinType }), (max, obj) => {
    return obj.index > max.index ? obj : max;
  }) || { index: -1 };

  // Create "dull" wallet with options
  const wallet = newStorageWallet({
    ...options,
    index: latestAccount.index + 1
  });

  // Initialize a "dull"/storage wallet for an account
  const initializedWallet = await Wallet({ encryptedMnemonic, passphrase, wallet });

  // Store either a "dull" or active wallet for an account
  await storeWalletForAccount({ accountLabel, wallet: initializedWallet });

  return initializedWallet;
};

// TODO integrate with addWalletToAccount
const importWalletToAccount = async ({ account, passphrase, options }) => {
  const { encryptedMnemonic, accountLabel } = account;
  const { coinType, privateKey } = options;

  const existingWallets = await getWalletsForAccount({ accountLabel });
  const latestAccount = reduce(filter(existingWallets, { coinType }), (max, obj) => {
    return obj.index < max.index ? obj : max;
  }) || { index: -1 };

  // Create "dull" wallet with options
  const wallet = newStorageWallet({
    ...options,
    index: -Math.abs(latestAccount.index - 1)
  });

  // Initialize a "dull"/storage wallet for an account
  const initializedWallet = await Wallet({
    encryptedMnemonic,
    passphrase,
    wallet: { ...wallet, privateKey }
  });

  // Store either a "dull" or active wallet for an account
  await storeWalletForAccount({ accountLabel, wallet: initializedWallet, omitItems: false });

  return initializedWallet;
};

export {
  importWalletToAccount,
  addWalletToAccount,
  newStorageWallet,
  storeWalletForAccount,
  getWalletsForAccount,
  getActiveWalletForAccount
};
