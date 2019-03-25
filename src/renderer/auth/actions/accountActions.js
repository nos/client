import { createActions } from 'spunky';

import { getStorage, appendStorage } from 'shared/lib/storage';

export const ID = 'account';

// Getters
export default createActions(ID, () => async () => {
  return getStorage(ID);
});

// Append
export const appendAccountActions = createActions(
  ID,
  ({ label, value }) => async () => {
    await appendStorage(ID, label, value);
    return getStorage(ID);
  }
);
