import fetch from 'node-fetch';
import { sortBy, trim, filter, values, replace } from 'lodash';

import { TOKENS_URL, NETWORK_MAP } from 'shared/values/config';

function normalizeImage(str) {
  const src = replace(str, 'raw.githubusercontent.com', 'rawgit.com');
  return trim(src) === '' ? null : src;
}

export default async function getTokens(net) {
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
