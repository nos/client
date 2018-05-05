import { createActions } from 'spunky';

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
  return typeof currentNetwork === 'string' ? currentNetwork : 'TestNet';
});
