import Neon, { api } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'getStorage';

export const getStorage = async (net, { scriptHash, key, kek, top }) => {

  console.log('gejoigh', net);
  console.log('gejoigh', scriptHash);
  console.log('gejoigh', key);
  console.log('gejoigh', kek);
  console.log('gejoigh', top);

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

export default createActions(ID, ({ net, scriptHash, key, ...args }) => async () => {
  return getStorage(net, { scriptHash, key, args });
});
