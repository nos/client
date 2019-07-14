export const BTC = 0;
export const NEO = 888;
export const ETH = 60;

export const DEFAULT_CHAIN = NEO;

export const CHAIN_IDS = {
  // [BTC]: BTC,
  [NEO]: NEO
  // [ETH]: ETH
};

export default {
  // [BTC]: { name: 'Bitcoin', symbol: 'BTC', decimals: 8, chainId: BTC },
  [NEO]: { name: 'NEO', symbol: 'NEO', decimals: 0, chainId: NEO }
  // [ETH]: { name: 'Ethereum', symbol: 'ETH', decimals: 8, chainId: ETH }
};


// TODO refactor to coinTypes
