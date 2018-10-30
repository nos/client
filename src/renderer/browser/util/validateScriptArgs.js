import { wallet } from '@cityofzion/neon-js';
import { isArray } from 'lodash';

export default ({ scriptHash, operation, args }) => {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }
  if (typeof operation !== 'string') {
    throw new Error(`Invalid operation: "${operation}"`);
  }
  if (!isArray(args)) {
    throw new Error(`Invalid arguments: "${args}"`);
  }
};
