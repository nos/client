import BigNumber from 'bignumber.js';
import { pickBy } from 'lodash';

import hasDigits from './hasDigits';
import { ASSETS } from '../values/assets';

export default function formatAssets(assets) {
  return pickBy(assets, (value, key) => {
    const asset = ASSETS[key];
    const amount = new BigNumber(value);
    return asset && amount.gt(0) && hasDigits(amount, asset.decimals);
  });
}
