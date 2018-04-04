import Neon, { api } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'testinvoke';

export const testInvoke = async (net, { scriptHash, operation }) => {

  console.log(net);
  console.log(scriptHash);
  console.log(operation);
  // console.log(args);

  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });

  try {
    // Create script
    const script = Neon.create.script(scriptHash); // TODO scriptHash --> invoke

    const response = await Neon.rpc.Query.invokeScript(script).execute(endpoint);
    console.log(response.result);

    return {
      response: 'test'
    };
  } catch (e) {
    // Error during execution
    return { response: 'failTest' };
  }
};


export default createActions(ID, ({ net, scriptHash, operation }) => async () => {
  return testInvoke(net, { scriptHash, operation });
});
