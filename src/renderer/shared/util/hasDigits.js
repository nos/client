import BigNumber from 'bignumber.js';

export default function hasDigits(value, numDigits) {
  const number = new BigNumber(value);
  const truncatedNumber = new BigNumber(number.toFixed(numDigits));
  return truncatedNumber.eq(number);
}
