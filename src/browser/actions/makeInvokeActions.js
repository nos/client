import { createActions } from 'spunky';
import Neon, { wallet } from '@cityofzion/neon-js';
import { isArray } from 'lodash';

import { GAS } from 'shared/values/assets';

import generateDAppActionId from './generateDAppActionId';
import createScript from '../util/createScript';

export const ID = 'invoke';

const doInvoke = async ({ net, address, wif, scriptHash, operation, args }) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof operation !== 'string') {
    throw new Error(`Invalid operation: "${operation}"`);
  }

  if (!isArray(args)) {
    throw new Error(`Invalid arguments: "${args}"`);
  }

  const { response: { result, txid } } = await Neon.doInvoke({
    net,
    address,
    script: createScript(scriptHash, operation, args),
    privateKey: wif,
    gas: 0,
    intents: [{
      assetId: GAS,
      value: '0.00000001',
      scriptHash: wallet.getScriptHashFromAddress(address)
    }]
  });

  if (!result) {
    throw new Error('Invocation failed.');
  }

  return txid;
};

export default function makeInvokeActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ net, address, wif, scriptHash, operation, args }) => () => {
    return doInvoke({ net, address, wif, scriptHash, operation, args });
  });
}
