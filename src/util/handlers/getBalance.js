import { get } from 'lodash';

import { NEO } from '../../values/assets';

export default async function getBalance(store) {
  const state = store.getState();
  return get(state, `spunky.balances.data.${NEO}.balance`) || '0';
}
