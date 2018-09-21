import { extend, get, find } from 'lodash';
import { api, rpc, wallet } from '@cityofzion/neon-js';

import getTokens from './getTokens';
import { GAS, NEO, ASSETS } from '../values/assets';

async function getTokenBalance(endpoint, tokens, address) {
  try {
    const tokenHashes = tokens.map((token) => token.scriptHash);
    const response = await api.nep5.getTokenBalances(endpoint, tokenHashes, address);
    const response2 = await api.nep5.getToken(endpoint, tokens[0].scriptHash, address);
    // const balance = (response.balance || 0).toString();

    console.log(response);
    console.log(response2);

    // return {
    //   [token.scriptHash]: { ...token, ...response, balance }
    // };
  } catch (err) {
    // invalid scriptHash
    return {};
  }
}

async function getAssetBalances(endpoint, address) {
  const client = new rpc.RPCClient(endpoint);
  const { balances } = await client.getAccountState(address);

  const neoBalance = get(find(balances, { asset: `0x${NEO}` }), 'value', '0');
  const gasBalance = get(find(balances, { asset: `0x${GAS}` }), 'value', '0');

  return {
    [NEO]: { ...ASSETS[NEO], scriptHash: NEO, balance: neoBalance },
    [GAS]: { ...ASSETS[GAS], scriptHash: GAS, balance: gasBalance }
  };
}

export default async function getBalances({ net, address }) {
  const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan);

  if (!wallet.isAddress(address)) {
    throw new Error(`Invalid address: "${address}"`);
  }

  // Get token scriptHashes
  const tokens = await getTokens(net);
  const allTokens = getTokenBalance(endpoint, tokens, address);

  // asset balances
  promises.unshift(getAssetBalances(endpoint, address));

  return extend({}, ...await Promise.all(promises));
}
