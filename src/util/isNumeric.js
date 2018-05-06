import { BigNumber } from 'bignumber.js';
import { isEmpty } from 'lodash';

export default function isNumeric(value) {
  if (isEmpty(value)) {
    return false;
  }

  try {
    new BigNumber(value); // eslint-disable-line no-new
    return true;
  } catch (err) {
    return false;
  }
}
