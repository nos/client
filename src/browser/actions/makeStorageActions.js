import { wallet, api, rpc, u } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'storage';

const getStorage = async ({ net, scriptHash, key, encodeInput, decodeOutput }) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof key !== 'string') {
    throw new Error(`Invalid key: "${key}"`);
  }

  const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan);
  const { result } =
    await rpc.Query.getStorage(scriptHash, encodeInput
      ? u.str2hexstring(key)
      : key)
      .execute(endpoint);
  return decodeOutput ? u.hexstring2str(result) : result;
};

export default function makeStorageActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({
    net,
    scriptHash,
    key,
    encodeInput = true,
    decodeOutput = true
  }) => async () => {
    return getStorage({ net, scriptHash, key, encodeInput, decodeOutput });
  });
}
