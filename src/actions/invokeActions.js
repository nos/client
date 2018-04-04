import Neon, { api } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'testinvoke';

export const testInvoke = async (net, invoke) => {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, {net});

  try {
    // Create script
    const script = Neon.create.script(invoke);

    const response = await Neon.rpc.Query.invokeScript(script).execute(endpoint);
    console.log(response.result);

    return {
      response: 'test'
    };
  } catch (e) {
    // Error during execution
    return {};
  }
};


export default createActions(ID, ({net, scriptHash, operation, args}) => async () => {
  return testInvoke(net, {scriptHash, operation, args});
});
