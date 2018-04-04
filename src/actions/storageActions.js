import Neon, { api } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'storage';

export const getStorage = async (net, { scriptHash, key }) => {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });

  try {
    const response = await Neon.rpc.Query.getStorage(scriptHash, key).execute(endpoint);
    console.log(response.result);

    return {
      response: 'test'
    };
  } catch (e) {
    // Error during execution
    return {};
  }
};

export default createActions(ID, ({ net, scriptHash, key }) => async () => {
  return getStorage(net, { scriptHash, key });
});
