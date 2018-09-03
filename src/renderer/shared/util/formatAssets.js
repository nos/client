import BigNumber from 'bignumber.js';
import { pickBy } from 'lodash';

import { ASSETS } from '../values/assets';

function hasDigits(number, numDigits) {
  const truncatedNumber = new BigNumber(number.toFixed(numDigits));
  return truncatedNumber.eq(number);
}

export default function formatAssets(assets) {
  return pickBy(assets, (value, key) => {
    const asset = ASSETS[key];
    const amount = new BigNumber(value);
    return asset && amount.gt(0) && hasDigits(amount, asset.decimals);
  });
}
