import { createActions } from 'spunky';

import getBalances from '../util/getBalances';

export const ID = 'balances';

export default createActions(ID, ({ net, address, tokens = [] } = {}) => async () => {
  return getBalances({ net, address, tokens });
});
