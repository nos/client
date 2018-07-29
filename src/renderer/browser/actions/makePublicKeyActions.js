import { createActions } from 'spunky';

import generateDAppActionId from './generateDAppActionId';
import getPublicKey from '../util/getPublicKey';

export const ID = 'getPublicKey';

export default function makePublicKeyActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ wif }) => () => {
    return getPublicKey(wif);
  });
}
