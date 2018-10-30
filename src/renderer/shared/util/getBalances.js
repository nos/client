import { extend, get, find } from 'lodash';
import { api, rpc, wallet } from '@cityofzion/neon-js';

import getRPCEndpoint from 'util/getRPCEndpoint';

import getTokens from './getTokens';
import { GAS, NEO, ASSETS } from '../values/assets';

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
    [NEO]: { ...ASSETS[NEO], scriptHash: NEO, balance: neoBalance },
    [GAS]: { ...ASSETS[GAS], scriptHash: GAS, balance: gasBalance }
  };
}

export default async function getBalances({ net, address }) {
  const endpoint = await getRPCEndpoint(net);

  if (!wallet.isAddress(address)) {
    throw new Error(`Invalid address: "${address}"`);
  }

  // token balances - // TODO use getTokenBalances to avoid multiple api calls
  const promises = (await getTokens(net)).map((token) => {
    return getTokenBalance(endpoint, token, address);
  });

  // asset balances
  promises.unshift(getAssetBalances(endpoint, address));

  return extend({}, ...await Promise.all(promises));
}
