import BigNumber from 'bignumber.js';
import { pickBy } from 'lodash';

function hasDigits(number, numDigits) {
  const truncatedNumber = new BigNumber(number.toFixed(numDigits));
  return truncatedNumber.eq(number);
}

export default function formatIntents(intents) {
  return pickBy(intents, (value, key) => {
    const amount = new BigNumber(value);

    return (key === 'NEO' && amount.gt(0) && hasDigits(amount, 0)) ||
           (key === 'GAS' && amount.gt(0) && hasDigits(amount, 8));
  });
}
