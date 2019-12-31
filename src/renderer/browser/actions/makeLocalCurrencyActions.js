import { createActions } from 'spunky';

import { getStorage } from 'shared/lib/storage';
import { DEFAULT_CURRENCY } from 'shared/values/currencies';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'currency';

export default function makeCurrentNetworkActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, () => async () => {
    const currency = await getStorage(ID);
    return typeof currency === 'string' ? currency : DEFAULT_CURRENCY;
  });
}
