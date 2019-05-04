import { createActions } from 'spunky';
import bip39 from 'bip39';
import { reduce, attempt, isError, omit, filter } from 'lodash';
import uuid from 'uuid/v4';

import Wallet from 'auth/util/Wallet';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';

import CHAINS from 'shared/values/chains';
import { DEFAULT_NET } from 'values/networks';

export const ID = 'auth';

// TODO split up file
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

const addAccount = async ({ authData, chainType, passphrase }) => {
  const accountId = uuid();

  const selectedChain = CHAINS[chainType.toUpperCase()];

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
  return () => addAccount({ authData: account, passphrase, chainType });
});

export default createActions(ID, ({ account, passphrase }) => {
  return () => authenticate({ account, passphrase });
});
