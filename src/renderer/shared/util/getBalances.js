import { values, sortBy, filter, extend, replace, get, find, trim } from 'lodash';
import { api, rpc, wallet } from '@cityofzion/neon-js';

import getTokens from 'shared/util/getTokens';

import { GAS, NEO } from '../values/assets';

async function getTokenBalance(endpoint, token, address) {
  try {
    const response = await api.nep5.getToken(endpoint, token.scriptHash, address);
    const balance = (response.balance || 0).toString();

    return {
      [token.scriptHash]: { ...token, ...response, balance }
    };
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
    [NEO]: { name: 'NEO', symbol: 'NEO', scriptHash: NEO, balance: neoBalance, decimals: 0 },
    [GAS]: { name: 'GAS', symbol: 'GAS', scriptHash: GAS, balance: gasBalance, decimals: 8 }
  };
}

export default async function getBalances({ net, address }) {
  const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan);

  if (!wallet.isAddress(address)) {
    throw new Error(`Invalid script hash: "${address}"`);
  }

  // token balances
  const promises = (await getTokens(net)).map((token) => {
    return getTokenBalance(endpoint, token, address);
  });

  // asset balances
  promises.unshift(getAssetBalances(endpoint, address));

  return extend({}, ...await Promise.all(promises));
}
