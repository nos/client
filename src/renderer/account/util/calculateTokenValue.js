import BigNumber from 'bignumber.js';

export default function calculateTokenValue(token, prices) {
  const { symbol, balance, decimals } = token;
  const value = new BigNumber(balance).times(prices[symbol] || 0);

  return parseFloat(value.toFixed(decimals), 10);
}
