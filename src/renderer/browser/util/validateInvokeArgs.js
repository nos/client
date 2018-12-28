import { wallet } from '@cityofzion/neon-js';
import { some, isString, isObject, isArray, isEmpty } from 'lodash';

import isValidAsset from './isValidAsset';

const isInvalidAsset = (amount, assetId) => !isValidAsset(assetId, amount);

export default function validateInvokeArgs({ scriptHash, operation, args, assets }) {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (!isString(operation) || isEmpty(operation)) {
    throw new Error(`Invalid operation: "${operation}"`);
  }

  if (!isArray(args)) {
    throw new Error(`Invalid arguments: "${args}"`);
  }

  if (assets && (!isObject(assets) || some(assets, isInvalidAsset))) {
    throw new Error(`Invalid assets: ${JSON.stringify(assets)}`);
  }
}
