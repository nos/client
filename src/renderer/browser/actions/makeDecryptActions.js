import { createActions } from 'spunky';

import generateDAppActionId from './generateDAppActionId';
import decrypt from '../util/decrypt';

export const ID = 'decrypt';

export default function makeDecryptActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ senderPublicKey, wif, iv, mac, data }) => () => {
    return decrypt({ senderPublicKey, wif, iv, mac, data });
  });
}
