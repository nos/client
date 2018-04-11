import { createActions } from 'spunky';
import { getStorage, setStorage } from '../../lib/storage';

export const ID = 'currentNetwork';

export const setCurrentNetwork = createActions(ID, ({ currentNetwork }) => async () => {
  const data = { currentNetwork };
  await setStorage(ID, data);
  return data;
});

export const getCurrentNetwork = createActions(ID, () => async () => {
  return (await getStorage(ID)) || { currentNetwork: 'TestNet' };
});
