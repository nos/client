import { createActions } from 'spunky';

import generateDAppActionId from './generateDAppActionId';
import encrypt from '../util/encrypt';
import getRandomIV from '../util/getRandomIV';

export const ID = 'encrypt';

export default function makeEncryptActions(sessionId, requestId, ivProvider = getRandomIV) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ recipientPublicKey, wif, data }) => () => {
    return encrypt({ recipientPublicKey, wif, data, ivProvider });
  });
}
