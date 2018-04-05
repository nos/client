import { api, rpc, u } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'getStorage';

export const getStorage = async (net, { scriptHash, key }) => {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });

  const r = await rpc.Query
    .getStorage(scriptHash, u.str2hexstring(key))
    .execute(endpoint);

  return { response: r.result };
};

export default createActions(ID, ({ net, scriptHash, key }) => async () => {
  return getStorage(net, { scriptHash, key });
});
