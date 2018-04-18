import { createActions } from 'spunky';

import getBalances from '../../util/getBalances';

export const ID = 'balances_api';

export default createActions(ID, ({ net, address, tokens = [], addedAddress } = {}) =>
  async () => {
    return getBalances({ net, address, tokens, addedAddress });
  });
