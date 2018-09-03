import { createActions } from 'spunky';
import { wallet, api } from '@cityofzion/neon-js';
import { isArray, mapKeys } from 'lodash';

import createScript from 'shared/util/createScript';
import formatAssets from 'shared/util/formatAssets';
import { ASSETS } from 'shared/values/assets';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'invoke';

async function doInvoke({ net, address, wif, scriptHash, operation, args, encodeArgs, assets }) {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof operation !== 'string') {
    throw new Error(`Invalid operation: "${operation}"`);
  }

  if (!isArray(args)) {
    throw new Error(`Invalid arguments: "${args}"`);
  }

  const config = {
    net,
    address,
    script: createScript(scriptHash, operation, args, encodeArgs),
    privateKey: wif,
    gas: 0
  };

  if (assets) {
    const scAddress = wallet.getAddressFromScriptHash(scriptHash);
    const intentConfig = mapKeys(formatAssets(assets), (value, key) => ASSETS[key].symbol);
    config.intents = api.makeIntent(intentConfig, scAddress);
  }

  const { response: { result, txid } } = await api.doInvoke(config);

  if (!result) {
    throw new Error('Invocation failed.');
  }

  return txid;
}

export default function makeInvokeActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({
    net,
    address,
    wif,
    scriptHash,
    operation,
    args,
    assets,
    encodeArgs = true
  }) => () => {
    return doInvoke({ net, address, wif, scriptHash, operation, args, assets, encodeArgs });
  });
}
