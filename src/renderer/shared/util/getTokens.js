import fetch from 'node-fetch';
import { sortBy, trim, filter, values } from 'lodash';

const TOKENS_URL = 'https://raw.githubusercontent.com/CityOfZion/neo-tokens/master/tokenList.json';

const NETWORK_MAP = {
  MainNet: '1'
};

function normalizeImage(src) {
  return trim(src) === '' ? null : src;
}

export default async function getTokens(net = 'MainNet') {
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
