import { createActions } from 'spunky';
import { getStorage, setStorage } from '../../lib/storage';

export const ID = 'currentNetwork';

export const setCurrentNetwork = createActions(ID, (currentNetwork) => async () => {
  const data = { currentNetwork };
  await setStorage(ID, currentNetwork);
  return data.currentNetwork;
});

export default createActions(ID, () => async () => {
  const data = await getStorage(ID);
  return (data && data.currentNetwork) || 'TestNet';
});
