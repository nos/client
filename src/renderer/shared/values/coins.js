export const BTC = 0;
export const NEO = 888;
export const ETH = 60;

export const DEFAULT_COIN = NEO;

export const COIN_TYPES = {
  // [BTC]: BTC,
  [NEO]: NEO
  // [ETH]: ETH
};

export default {
  // [BTC]: { name: 'Bitcoin', symbol: 'BTC', decimals: 8, coinType: BTC },
  [NEO]: { name: 'NEO', symbol: 'NEO', decimals: 0, coinType: NEO }
  // [ETH]: { name: 'Ethereum', symbol: 'ETH', decimals: 8, coinType: ETH }
};
