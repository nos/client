import { createActions } from 'spunky';
import { wallet } from '@cityofzion/neon-js';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'getPublicKey';

const getPublicKey = (wif) => {
  const account = new wallet.Account(wif);
  return account.publicKey;
};

export default function makeEncryptActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({
    wif
  }) => () => {
    return getPublicKey(wif);
  });
}
