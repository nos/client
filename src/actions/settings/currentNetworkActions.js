import { createActions } from 'spunky';
import { getStorage, setStorage } from '../../lib/storage';

export const ID = 'currentNetwork';

export const setCurrentNetwork = createActions(ID, (currentNetwork) => async () => {
  await setStorage(ID, currentNetwork);
  return currentNetwork;
});

export default createActions(ID, () => async () => {
  const currentNetwork = await getStorage(ID);
  return typeof currentNetwork === 'string' ? currentNetwork : 'TestNet';
});
