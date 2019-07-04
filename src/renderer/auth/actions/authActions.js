import { createActions } from 'spunky';
import bip39 from 'bip39';
import { reduce, attempt, isError, omit, filter } from 'lodash';
import uuid from 'uuid/v4';
import { wallet } from '@cityofzion/neon-js';

import { verifyAndCreateWallet } from 'auth/util/WalletStorage';
import { getActiveWalletForAccount, storeWallet } from 'auth/util/StorageWallet/StorageWallet';
import newWalletInstance from 'auth/util/HardwareWallet/HardwareWallet';

import Wallet from 'auth/util/Wallet';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import { updateStorage } from 'shared/lib/storage';
import CHAINS from 'shared/values/chains';
import { DEFAULT_NET } from 'values/networks';

export const ID = 'auth';
const ACCOUNT_ID = 'account';

const authenticate = async ({ account, passphrase }) => {
  const mnemonic = attempt(simpleDecrypt, account.encryptedMnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error('Please make sure you entered the correct password.');
  }

  // Get wallet from storage through activeWalletId and check if isHardware

  console.log('Getting account', account);

  const walletForAccount = await getActiveWalletForAccount(account);
  console.log('Wallet for account', walletForAccount);

  // Deterministically generate a 512 bit seed hex seed
  const seed = !walletForAccount.isHardware ? bip39.mnemonicToSeed(mnemonic, passphrase) : null;

  console.log(`What's the seed ${seed}`);

  // TODO newWalletInstance should ONLY return WIF, address, PrivKey, PubKey in any case
  const initializedWallet = newWalletInstance(walletForAccount, seed);

  return {
    ...account,
    wallet: {
      ...walletForAccount,
      ...initializedWallet
    }
  };
};

const addAccount = async ({ account, chainType, passphrase }) => {
  const accountId = uuid();

  const { chainId } = CHAINS[chainType] || {};

  if (!chainId) {
    throw new Error('Incorrect chain selected.');
  }

  const latestAccount = reduce(filter(account.accounts, { chainId }), (max, obj) => {
    return obj.index > max.index ? obj : max;
  });

  const newWallet = {
    [accountId]: {
      accountId,
      chainId,
      index: latestAccount.index + 1,
      account: 0,
      change: 0,
      net: DEFAULT_NET
    }
  };

  const newAccount = {
    ...omit(account, 'accounts'),
    accounts: {
      ...account.accounts,
      ...newWallet
    }
  };

  await updateStorage(
    ACCOUNT_ID,
    account.accountLabel,
    omit(newAccount, ['instances', 'passphrase', 'mnemonic'])
  );

  return authenticate({ account: newAccount, passphrase });
};

export const verifyAndAuthenticateActions = createActions(ID, (data) => {
  return async () => {
    // authData requires account and password
    const { account, passphrase } = await verifyAndCreateWallet(data);
    const authenticated = authenticate({ account, passphrase });
    await storeWallet(account.accountLabel, omit(account.wallet, 'WIF', 'privateKey'));
    return authenticated;
  };
});

export const addAccountActions = createActions(ID, ({ account, passphrase, chainType }) => {
  return () => addAccount({ account, passphrase, chainType });
});

export default createActions(ID, ({ account, passphrase }) => {
  return () => authenticate({ account, passphrase });
});
