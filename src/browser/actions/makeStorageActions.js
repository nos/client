import { wallet, api, rpc, u } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'storage';

const getStorage = async ({ net, scriptHash, key, encode = true }) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof key !== 'string') {
    throw new Error(`Invalid key: "${key}"`);
  }

  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });
  const { result } =
    await rpc.Query.getStorage(scriptHash, encode ? u.str2hexstring(key) : key).execute(endpoint);
  return result;
};

export default function makeStorageActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ net, scriptHash, key, encode }) => async () => {
    return getStorage({ net, scriptHash, key, encode });
  });
}
