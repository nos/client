import { api, rpc, u } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'getStorage';

export const getStorage = async (net, { scriptHash, key }) => {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });

  const r = await rpc.Query
    .getStorage(scriptHash, u.str2hexstring(key))
    .execute(endpoint);

  // const r = await rpc.queryRPC(endpoint, {
  //   method: 'getstorage',
  //   params: [scriptHash, key]
  // });
  console.log('resposne: ', r);

  const response = 'test';
  console.log(response);

  return { response };
};

export default createActions(ID, ({ net, scriptHash, key }) => async () => {
  return getStorage(net, { scriptHash, key });
});
