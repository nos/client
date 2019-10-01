import BigNumber from 'bignumber.js';

export default function formatBalance(balance, decimals) {
  const value = new BigNumber(balance).toFormat(decimals);
  const [integer, fraction] = value.split('.');

  return [integer, `.${fraction || 0}`.replace(/\.?0+$/, '')].join('');
}
