import { createActions } from 'spunky';
import { has } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';
import CURRENCIES, { DEFAULT_CURRENCY } from 'shared/values/currencies';

export const ID = 'currency';

// Setters
export const setCurrency = createActions(ID, (currency) => async () => {
  if (!has(CURRENCIES, currency)) {
    throw new Error(`Invalid currency "${currency}".`);
  }

  await setStorage(ID, currency);
  return currency;
});

// Getters
export default createActions(ID, () => async () => {
  const currency = await getStorage(ID);
  return typeof currency === 'string' ? currency : DEFAULT_CURRENCY;
});
