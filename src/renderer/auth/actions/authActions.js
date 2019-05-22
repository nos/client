import { createActions } from 'spunky';
import bip39 from 'bip39';
import { reduce, attempt, isError, omit, filter } from 'lodash';
import uuid from 'uuid/v4';

import Wallet from 'auth/util/Wallet';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import { updateStorage } from 'shared/lib/storage';

import CHAINS from 'shared/values/chains';
import { DEFAULT_NET } from 'values/networks';

export const ID = 'auth';
const ACCOUNT_ID = 'account';

// TODO split up file
const authenticate = async ({ account, passphrase }) => {
  const mnemonic = attempt(simpleDecrypt, account.encryptedMnemonic, passphrase);

  // Validate mnemnoic
  if (isError(mnemonic) || !bip39.validateMnemonic(mnemonic, bip39.wordlists[DEFAULT_LANGUAGE])) {
    throw new Error('Please make sure you entered the correct password.');
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

const verifyAndAuthenticate = ({
  account,
  passphrase,
  secretWord,
  firstMnemonicWord,
  firstMnemonicWordIndex,
  secondMnemonicWord,
  secondMnemonicWordIndex
}) => {
  if (account.isLedger) {
    // TODO write authenticateLedger
    // return authenticateLedger();
  }

  const mnemonicArray = account.mnemonic.trim().split(' ');

  if (account.passphrase !== passphrase) {
    throw new Error("You've entered a wrong password");
  }

  if (account.secretWord !== secretWord) {
    throw new Error("You've entered the wrong secret word");
  }

  if (mnemonicArray[firstMnemonicWordIndex - 1] !== firstMnemonicWord) {
    throw new Error(
      `Word number #${firstMnemonicWordIndex} of your recovery seed does not match the word "${firstMnemonicWord}"`
    );
  }

  if (mnemonicArray[secondMnemonicWordIndex - 1] !== secondMnemonicWord) {
    throw new Error(
      `Word number #${secondMnemonicWordIndex} of your recovery seed does not match the word "${secondMnemonicWord}"`
    );
  }

  return authenticate({ account, passphrase });
};

export const verifyAndAuthenticateActions = createActions(ID, (data) => {
  return () => verifyAndAuthenticate(data);
});

export const addAccountActions = createActions(ID, ({ account, passphrase, chainType }) => {
  return () => addAccount({ account, passphrase, chainType });
});

export default createActions(ID, ({ account, passphrase }) => {
  return () => authenticate({ account, passphrase });
});