import { createActions } from 'spunky';

import getStorage from 'shared/util/getStorage';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'storage';

export default function makeStorageActions(sessionId, requestId, call = getStorage) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(
    id,
    ({ net, scriptHash, key, encodeInput = true, decodeOutput = true }) => async () => {
      return call({ net, scriptHash, key, encodeInput, decodeOutput });
    }
  );
}
