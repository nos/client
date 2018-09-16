import { createActions } from 'spunky';

import { DEFAULT_NET } from 'values/networks';

import { getStorage, setStorage } from 'shared/lib/storage';

export const ID = 'currentNetwork';

// Setters
export const setCurrentNetwork = createActions(ID, (currentNetwork) => async () => {
  await setStorage(ID, currentNetwork);
  return currentNetwork;
});

// Getters
export default createActions(ID, () => async () => {
  const currentNetwork = await getStorage(ID);
  return typeof currentNetwork === 'string' ? currentNetwork : DEFAULT_NET;
});
