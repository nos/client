import { createActions } from 'spunky';
import bip39 from 'bip39';
import { omit } from 'lodash';
import uuid from 'uuid/v4';

import CHAINS from 'shared/values/chains';
import { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { DEFAULT_NET } from 'values/networks';

import Wallet from 'auth/util/Wallet';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';

export const ID = 'auth';

const authenticate = async ({ authData, type }) => {
  try {
    const accountId = uuid();

    const selectedChain = CHAINS[type.toUpperCase()];

    if (!selectedChain) {
      throw new Error('Incorrect chain selected.');
    }

    const newAccount = {
      [accountId]: {
        accountId,
        chainId: selectedChain,
        index: DEFAULT_ACC_INDEX,
        account: 0,
        change: 0,
        net: DEFAULT_NET
      }
    };

    const x = {
      ...omit(authData, 'accounts'),
      accounts: {
        ...authData.accounts,
        ...newAccount
      }
    };

    console.log('x ', x);
    return x;

    return { ...account, instances };
  } catch (e) {
    console.log(e);
  }
};

export default createActions(ID, (data) => {
  return () => authenticate(data);
});
