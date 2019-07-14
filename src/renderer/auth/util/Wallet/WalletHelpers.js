import uuid from 'uuid/v4';
import bip39 from 'bip39';
import { isEmpty, attempt, isError, omit, reduce, filter } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { DEFAULT_NET } from 'values/networks';
import { DEFAULT_CHAIN } from 'shared/values/chains';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import simpleDecrypt from 'shared/util/simpleDecrypt';

import HardwareWallet from 'auth/util/HardwareWallet/HardwareWallet';
import MnemonicWallet from 'auth/util/MnemonicWallet/MnemonicWallet';

export const ID = 'wallets';
const walletFilterProps = ['signingFunction', 'WIF', 'privateKey'];

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

  console.info(`storeWallet with label: ${accountLabel}-${label}`, wallet);

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


const initializeWallet = ({ encryptedMnemonic, passphrase, wallet }) => {
  const mnemonic = attempt(simpleDecrypt, encryptedMnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error('Please make sure you\'ve entered the correct password.');
  }

  return wallet.isHardware
    ? HardwareWallet({ wallet })
    : MnemonicWallet({ seed: bip39.mnemonicToSeed(mnemonic, passphrase), wallet });
};

const addWalletToAccount = async ({ account, passphrase, options }) => {
  const { encryptedMnemonic, accountLabel, isHardware } = account;

  const existingWallets = await getWalletsForAccount({ accountLabel });
  const latestAccount = reduce(filter(existingWallets, { type: options.coinType }), (max, obj) => {
    return obj.index > max.index ? obj : max;
  }) || { index: -1 };

  // Create "dull" wallet with options - TODO remove ?
  const wallet = newStorageWallet({ ...options, isHardware, index: latestAccount.index + 1 });

  // Initialize a "dull"/storage wallet for an account
  const initializedWallet = initializeWallet({ encryptedMnemonic, passphrase, wallet });

  // Store either a "dull" or active wallet for an account
  await storeWalletForAccount({ accountLabel, wallet: initializedWallet });

  return initializedWallet;
};

export {
  initializeWallet,
  addWalletToAccount,
  newStorageWallet,
  storeWalletForAccount,
  getWalletsForAccount,
  getActiveWalletForAccount
};
