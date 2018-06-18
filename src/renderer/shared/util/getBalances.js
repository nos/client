import { extend } from 'lodash';
import { api, wallet } from '@cityofzion/neon-js';

import { NEO, GAS } from '../values/assets';
import { TOKEN_NAMES, TOKEN_PRECISION } from '../values/tokens';

function getTokenData(tokens, tokenName) {
  const scriptHash = TOKEN_NAMES[tokenName];
  const decimals = TOKEN_PRECISION[scriptHash];
  const balance = tokens[tokenName] ? tokens[tokenName].balance.div(10 ** decimals).round(decimals).toString() : '0';
  return { scriptHash, balance, decimals };
}

export default async function getBalances({ net, address, tokens }) {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net });

  if (!wallet.isAddress(address)) {
    throw new Error(`Invalid script hash: "${address}"`);
  }

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
    const assetBalances = await api.getBalanceFrom({ net, address }, api.neoscan);

    const { assets } = assetBalances.balance;

    // The API doesn't always return NEO or GAS keys if, for example, the address only has one asset
    const neoBalance = assets.NEO ? assets.NEO.balance.toString() : '0';
    const gasBalance = assets.GAS ? assets.GAS.balance.round(8).toString() : '0';

    const balances = {
      [NEO]: { scriptHash: NEO, balance: neoBalance, decimals: 0 },
      [GAS]: { scriptHash: GAS, balance: gasBalance, decimals: 8 }
    };

    delete assets.NEO;
    delete assets.GAS;

    Object.keys(assets).forEach((tokenName) => {
      const tokenData = getTokenData(assets, tokenName);
      balances[tokenData.scriptHash] = tokenData;
    });

    return balances;
  })());

  return extend({}, ...await Promise.all(promises));
}
