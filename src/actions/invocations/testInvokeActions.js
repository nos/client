import { api, rpc, u } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

import { createScript } from "../../util/scriptHelper";

export const ID = 'testinvoke';

const testInvoke = async (net, { scriptHash, operation, args }) => {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });
  const myScript = createScript(scriptHash, operation, args);
  return await rpc.Query.invokeScript(myScript).execute(endpoint);
};

export default createActions(ID, ({ net, scriptHash, operation, args }) => async () => {
  return testInvoke(net, { scriptHash, operation, args });
});
