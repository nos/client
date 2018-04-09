import { api, rpc } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

import createScript from '../../util/scriptHelper';

export const ID = 'testInvoke';

const testInvoke = async ({ net, scriptHash, operation, args }) => {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });
  const myScript = createScript(scriptHash, operation, args);
  const result = await rpc.Query.invokeScript(myScript).execute(endpoint);
  return result;
};

export default createActions(ID, ({ net, scriptHash, operation, args }) => () => {
  return testInvoke({ net, scriptHash, operation, args });
});
