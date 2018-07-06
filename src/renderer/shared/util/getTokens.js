import { sortBy, values } from 'lodash';
import fetch from 'node-fetch';

import { TOKENS_URL, NETWORK_MAP } from 'shared/values/config';

export default async function getTokens(net, details = false) {
  const networkKey = NETWORK_MAP[net];
  const response = await fetch(TOKENS_URL);
  const tokens = values(await response.json());

  // eslint-disable-next-line
  return sortBy(tokens, 'symbol').map((token) => {
    const tokenDetails = token.networks[networkKey];
    if (tokenDetails) {
      return details
        ? { symbol: token.symbol, ...tokenDetails }
        : tokenDetails.hash;
    }
  });
}
