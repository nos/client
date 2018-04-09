import { wallet, api, rpc } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

import createScript from '../../util/scriptHelper';

export const ID = 'testInvoke';

const testInvoke = async ({ net, scriptHash, operation, args }) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof operation !== 'string') {
    throw new Error(`Invalid operation: "${operation}"`);
  }

  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });
  const myScript = createScript(scriptHash, operation, args);
  const { result } = await rpc.Query.invokeScript(myScript).execute(endpoint);

  return result.script;
};

export default createActions(ID, ({ net, scriptHash, operation, args }) => () => {
  return testInvoke({ net, scriptHash, operation, args });
});
