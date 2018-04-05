import Neon, { api, u } from '@cityofzion/neon-js';

import { createActions } from 'spunky';

export const ID = 'testinvoke';
const s2h = u.str2hexstring;

export const testInvoke = async (net, { scriptHash, operation, args }) => {

  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });

  const myArg = s2h(args[0]);


  const invoke = {
    scriptHash,
    operation,
    args: myArg
  };

  try {
    // Create script
    const script = Neon.create.script(invoke);

    const response = await Neon.rpc.Query.invokeScript(script).execute(endpoint);
    console.log(response.result);

    return {
      response: 'test'
    };
  } catch(e) {
    console.log('error', e);
  }
};

export default createActions(ID, ({ net, scriptHash, operation, args }) => async () => {
  return testInvoke(net, { scriptHash, operation, args });
});
