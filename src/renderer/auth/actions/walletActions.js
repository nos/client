import { createActions } from 'spunky';

import { getStorage } from 'shared/lib/storage';

export const ID = 'wallets';

// Getters
export default createActions(ID, () => async () => {
  return getStorage(ID);
});
