import { wallet, api, rpc, u } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'storage';

const getStorage = async ({ net, scriptHash, key }) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof key !== 'string') {
    throw new Error(`Invalid key: "${key}"`);
  }

  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });
  const { result } = await rpc.Query.getStorage(scriptHash, u.str2hexstring(key)).execute(endpoint);
  return result;
};

export default createActions(ID, ({ net, scriptHash, key }) => async () => {
  return getStorage({ net, scriptHash, key });
});
