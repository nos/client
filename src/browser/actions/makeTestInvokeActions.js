import { createActions } from 'spunky';
import { api, rpc, wallet } from '@cityofzion/neon-js';
import { isArray } from 'lodash';

import generateDAppActionId from './generateDAppActionId';
import createScript from '../util/createScript';

export const ID = 'testInvoke';

const testInvoke = async ({ net, scriptHash, operation, args, encodeArgs }) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof operation !== 'string') {
    throw new Error(`Invalid operation: "${operation}"`);
  }

  if (!isArray(args)) {
    throw new Error(`Invalid arguments: "${args}"`);
  }

  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });
  const script = createScript(scriptHash, operation, args, encodeArgs);
  const { result } = await rpc.Query.invokeScript(script).execute(endpoint);

  return result;
};

export default function makeTestInvokeActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ net, scriptHash, operation, args, encodeArgs = true }) => () => {
    return testInvoke({ net, scriptHash, operation, args, encodeArgs });
  });
}
