import { createActions } from 'spunky';

import { DEFAULT_NET } from 'values/networks';
import { getStorage } from 'shared/lib/storage';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'currentNetwork';

export default function makeCurrentNetworkActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, () => async () => {
    const currentNetwork = await getStorage(ID);
    return typeof currentNetwork === 'string' ? currentNetwork : DEFAULT_NET;
  });
}
