import { createActions } from 'spunky';

import getBalances from 'util/getBalances';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'balances';

export default function makeBalancesActions(sessionId, requestId, call = getBalances) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ net, address, tokens = [] } = {}) => async () => {
    return call({ net, address, tokens });
  });
}
