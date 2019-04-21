import { createActions } from 'spunky';
import bip39 from 'bip39';
import { reduce, attempt, isError, omit, filter } from 'lodash';
import uuid from 'uuid/v4';

import Wallet from 'auth/util/Wallet';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';

import CHAINS from 'shared/values/chains';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { DEFAULT_NET } from 'values/networks';

export const ID = 'auth';

const authenticate = async ({ account, passphrase }) => {
  const mnemonic = attempt(simpleDecrypt, account.encryptedMnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error('Invalid mnemonic. Please make sure you entered the correct password.');
  }

  // Deterministically generate a 512 bit seed hex seed
  const seed = bip39.mnemonicToSeed(mnemonic, passphrase);
  const wallet = new Wallet(seed);

  const instances = reduce(
    account.accounts,
    (acumm, acc) => ({
      ...acumm,
      [acc.accountId]: wallet.deriveWalletFromAccount(acc)
    }),
    {}
  );

  return { ...account, instances };
};

const addAccount = async ({ authData, type, passphrase }) => {
  const accountId = uuid();

  const selectedChain = CHAINS[type.toUpperCase()];

  if (!selectedChain) {
    throw new Error('Incorrect chain selected.');
  }

  const { accounts } = authData;
  const latestAccount = reduce(filter(accounts, { chainId: selectedChain }), (max, obj) => {
    return obj.index > max.index ? obj : max;
  });

  const newAccount = {
    [accountId]: {
      accountId,
      chainId: selectedChain,
      index: latestAccount.index + 1,
      account: 0,
      change: 0,
      net: DEFAULT_NET
    }
  };

  const account = {
    ...omit(authData, 'accounts'),
    accounts: {
      ...authData.accounts,
      ...newAccount
    }
  };

  // TODO modal to ask password
  return authenticate({ account, passphrase: 'q' });
};

export const addAccountActions = createActions(ID, ({ account, passphrase, type }) => {
  return () => addAccount({ authData: account, passphrase, type });
});

export default createActions(ID, ({ account, passphrase, type }) => {
  return () => authenticate({ account, passphrase, type });
});
