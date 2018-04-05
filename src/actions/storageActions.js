import Neon, { api } from 'neon-js';
import { createActions } from 'spunky';

export const ID = 'getStorage';

export const getStorage = async (net, { scriptHash, key }) => {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });

  const response = await Neon.rpc.Query.getStorage(scriptHash, key).execute(endpoint);
  console.log(response.result);

  return {
    response: 'test'
  };
};

export default createActions(ID, ({ net, scriptHash, key }) => async () => {
  console.log(net, scriptHash, key);
  return getStorage(net, { scriptHash, key });
});
