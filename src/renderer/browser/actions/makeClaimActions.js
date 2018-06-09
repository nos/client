import { createActions } from 'spunky';

import claimGas from 'shared/util/claimGas';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'claim';

export default function makeClaimActions(sessionId, requestId, call = claimGas) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ net, address, wif }) => () => {
    return call({ net, address, wif });
  });
}
