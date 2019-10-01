import BigNumber from 'bignumber.js';
import { createActions } from 'spunky';

import { getStorage, setStorage } from 'shared/lib/storage';

const DEFAULT_FEE = '0.00000000';

export const ID = 'fee';

// Setters
export const setFee = createActions(ID, (fee) => async () => {
  const value = new BigNumber(fee);

  if (value.isNaN()) {
    throw new Error(`Invalid fee value: "${fee}"`);
  }

  const formattedValue = value.toFixed(8);

  await setStorage(ID, formattedValue);
  return formattedValue;
});

// Getters
export default createActions(ID, () => async () => {
  const fee = await getStorage(ID);
  return typeof fee === 'string' ? fee : DEFAULT_FEE;
});
