import { createActions } from 'spunky';

import getBalances from 'shared/util/getBalances';
import generateDAppActionId from './generateDAppActionId';

export const ID = 'balances';

export default function makeBalancesActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ net, address, tokens = [] } = {}) => async () => {
    return getBalances({ net, address, tokens });
  });
}
