import fetch from 'node-fetch';
import { values, sortBy, filter, extend, replace, trim } from 'lodash';
import { api, wallet } from '@cityofzion/neon-js';

import { GAS, NEO } from '../values/assets';

const TOKENS_URL = 'https://raw.githubusercontent.com/CityOfZion/neo-tokens/master/tokenList.json';

const NETWORK_MAP = {
  MainNet: '1'
};

function normalizeImage(str) {
  const src = replace(str, 'raw.githubusercontent.com', 'rawgit.com');
  return trim(src) === '' ? null : src;
}

async function getTokens(net) {
  const networkKey = NETWORK_MAP[net];

  const response = await fetch(TOKENS_URL);
  const tokens = values(await response.json());
  const networkTokens = filter(tokens, (token) => token.networks[networkKey]);
  const sortedTokens = sortBy(networkTokens, 'symbol');

  return sortedTokens.map(({ image, networks }) => {
    const { name, hash: scriptHash, decimals, totalSupply } = networks[networkKey];
    return { name, scriptHash, decimals, totalSupply, image: normalizeImage(image) };
  });
}

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

async function getAssetBalances(net, address) {
  const assetBalances = await api.getBalanceFrom({ net, address }, api.neoscan);

  const { assets } = assetBalances.balance;

  // The API doesn't always return NEO or GAS keys if, for example, the address only has one asset
  const neoBalance = assets.NEO ? assets.NEO.balance.toString() : '0';
  const gasBalance = assets.GAS ? assets.GAS.balance.round(8).toString() : '0';

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
  promises.unshift(getAssetBalances(net, address));

  return extend({}, ...await Promise.all(promises));
}
