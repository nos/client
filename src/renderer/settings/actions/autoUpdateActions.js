import { createActions } from 'spunky';

import { getStorage, setStorage } from 'shared/lib/storage';

export const ID = 'currentNetwork';

// Setters
export const setAutoUpdateActions = createActions(ID, () => async () => {
  const currentSetting = await getStorage(ID);
  console.log('setting for first time? ', !currentSetting || true);
  await setStorage(ID, !currentSetting || true);
  return !currentSetting;
});

// Getters
export default createActions(ID, () => async () => getStorage(ID));
