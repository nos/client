import { createActions } from 'spunky';
import { wallet, api } from '@cityofzion/neon-js';
import { mapKeys } from 'lodash';

import getRPCEndpoint from 'util/getRPCEndpoint';

import createScript from 'shared/util/createScript';
import formatAssets from 'shared/util/formatAssets';
import { ASSETS } from 'shared/values/assets';

import generateDAppActionId from './generateDAppActionId';
import validateInvokeArgs from '../util/validateInvokeArgs';

export const ID = 'invoke';

async function doInvoke({
  net,
  address,
  wif,
  publicKey,
  signingFunction,
  scriptHash,
  operation,
  assets,
  args,
  encodeArgs = true,
  fee = 0
}) {
  validateInvokeArgs({ scriptHash, operation, args, assets });

  const url = await getRPCEndpoint(net);
  const config = {
    net,
    url,
    address,
    script: createScript(scriptHash, operation, args, encodeArgs),
    privateKey: wif,
    publicKey,
    signingFunction,
    gas: 0,
    fees: fee
  };

  if (assets) {
    const scAddress = wallet.getAddressFromScriptHash(scriptHash);
    const intentConfig = mapKeys(formatAssets(assets), (value, key) => ASSETS[key].symbol);
    config.intents = api.makeIntent(intentConfig, scAddress);
  }

  const {
    response: { result, txid }
  } = await api.doInvoke(config, api.neoscan);

  if (!result) {
    throw new Error('Invocation failed.');
  }

  return txid;
}

export default function makeInvokeActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);
  return createActions(id, (options) => () => doInvoke(options));
}
