import { createActions } from 'spunky';

import getBalances from 'shared/util/getBalances';

export const ID = 'balances';

export default createActions(ID, ({ net, address, tokens = [] } = {}) => async () => {
  return getBalances({ net, address, tokens });
});
