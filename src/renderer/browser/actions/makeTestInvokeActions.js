import { createActions } from 'spunky';
import { rpc } from '@cityofzion/neon-js';
import { isArray } from 'lodash';

import getRPCEndpoint from 'util/getRPCEndpoint';

import createScript from 'shared/util/createScript';

import generateDAppActionId from './generateDAppActionId';
import createArrayScript from '../util/createArrayScript';
import validateScriptArgs from '../util/validateScriptArgs';

export const ID = 'testInvoke';

const testInvoke = async ({ net, scriptHash, operation, args, script, encodeArgs }) => {
  let invokeScript;

  if (scriptHash && operation && args) {
    validateScriptArgs({ scriptHash, operation, args });
    invokeScript = createScript(scriptHash, operation, args, encodeArgs);
  } else if (script) {
    if (typeof script !== 'string' && !isArray(script)) {
      throw new Error(`Invalid script: "${script}"`);
    }

    if (typeof script === 'string') {
      invokeScript = script;
    } else if (isArray(script)) {
      script.forEach((s) => validateScriptArgs(s));
      invokeScript = createArrayScript(script, encodeArgs);
    }
  } else {
    throw new Error('Invalid config!');
  }

  const endpoint = await getRPCEndpoint(net);
  const { result } = await rpc.Query.invokeScript(invokeScript).execute(endpoint);

  return result;
};

export default function makeTestInvokeActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(
    id,
    ({ net, scriptHash, operation, args, script, encodeArgs = true }) => () => {
      return testInvoke({ net, scriptHash, operation, args, script, encodeArgs });
    }
  );
}
