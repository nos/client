import { createActions } from 'spunky';
import { wallet, api } from '@cityofzion/neon-js';
import { isArray } from 'lodash';

import createScript from 'shared/util/createScript';
import generateDAppActionId from './generateDAppActionId';

export const ID = 'invoke';

const doInvoke = async ({
  net,
  address,
  wif,
  scriptHash,
  operation,
  args,
  encodeArgs,
  intents
}) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof operation !== 'string') {
    throw new Error(`Invalid operation: "${operation}"`);
  }

  if (!isArray(args)) {
    throw new Error(`Invalid arguments: "${args}"`);
  }

  const { response: { result, txid } } = await api.doInvoke({
    net,
    address,
    script: createScript(scriptHash, operation, args, encodeArgs),
    privateKey: wif,
    gas: 0,
    ...(intents
      ? { intents: api.makeIntent(intents, wallet.getScriptHashFromAddress(address)) }
      : undefined)
  });

  if (!result) {
    throw new Error('Invocation failed.');
  }

  return txid;
};

export default function makeInvokeActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({
    net,
    address,
    wif,
    scriptHash,
    operation,
    args,
    intents,
    encodeArgs = true
  }) => () => {
    return doInvoke({ net, address, wif, scriptHash, operation, args, intents, encodeArgs });
  });
}
