import { createActions } from 'spunky';
import { api } from 'neon-js';
import { extend } from 'lodash';

import { NEO, GAS } from '../values/assets';

export const ID = 'balances';

async function getBalances({ net, address, tokens }) {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });

  // token balances
  const promises = tokens.map(async (token) => {
    const { scriptHash } = token;

    try {
      const response = await api.nep5.getToken(endpoint, scriptHash, address);
      const balance = (response.balance || 0).toString();

      return {
        [scriptHash]: { ...response, scriptHash, balance }
      };
    } catch (err) {
      // invalid scriptHash
      return {};
    }
  });

  // asset balances
  promises.push((async () => {
    const assetBalances = await api.loadBalance(api.getBalanceFrom, { net, address });
    const { assets } = assetBalances.balance;

    // The API doesn't always return NEO or GAS keys if, for example, the address only has one asset
    const neoBalance = assets.NEO ? assets.NEO.balance.toString() : '0';
    const gasBalance = assets.GAS ? assets.GAS.balance.round(8).toString() : '0';

    return {
      [NEO]: { scriptHash: NEO, balance: neoBalance, decimals: 0 },
      [GAS]: { scriptHash: GAS, balance: gasBalance, decimals: 8 }
    };
  })());

  return extend({}, ...await Promise.all(promises));
}

export default createActions(ID, ({ net, address, tokens = [] } = {}) => async () => {
  return getBalances({ net, address, tokens });
});
