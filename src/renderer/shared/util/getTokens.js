import fetch from 'node-fetch';
import { sortBy, values, compact } from 'lodash';

import { TOKENS_URL, NETWORK_MAP } from 'shared/values/config';

export default async function getTokens(net, details = false) {
  const networkKey = NETWORK_MAP[net];

  const response = await fetch(TOKENS_URL);
  const tokens = values(await response.json());
  const sortedTokens = sortBy(tokens, 'symbol');
  const networkTokens = compact(sortedTokens.map((token) => ({
    symbol: token.symbol,
    ...token.networks[networkKey]
  })));
  return networkTokens.map((token) => (details ? token : token.hash));
}
