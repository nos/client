import { wallet, rpc, u } from '@cityofzion/neon-js';

import getRPCEndpoint from 'util/getRPCEndpoint';

export const encode = (value) => u.str2hexstring(value);
export const decode = (value) => u.hexstring2str(value);

export default async function getStorage({ net, scriptHash, key, encodeInput, decodeOutput }) {
  if (!wallet.isScriptHash(scriptHash)) {
    throw new Error(`Invalid script hash: "${scriptHash}"`);
  }

  if (typeof key !== 'string') {
    throw new Error(`Invalid key: "${key}"`);
  }

  const endpoint = await getRPCEndpoint(net);
  const input = encodeInput ? encode(key) : key;
  const { result } = await rpc.Query.getStorage(scriptHash, input).execute(endpoint);

  return decodeOutput ? decode(result) : result;
}
