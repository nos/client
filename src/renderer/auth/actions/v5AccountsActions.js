import { createActions } from 'spunky';

import { getStorage } from 'shared/lib/storage';

export const ID = 'profiles_v1';

// Getters
export default createActions(ID, () => async () => {
  return getStorage(ID);
});
