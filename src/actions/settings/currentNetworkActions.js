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

export const SET_CURRENT_NETWORK = 'SET_CURRENT_NETWORK';
export const ADD_NEW_NETWORK = 'ADD_NEW_NETWORK';

export const set_current_network = (network) => ({
  type: SET_CURRENT_NETWORK,
  network
});

export const add_new_network = (name, network) => ({
  type: ADD_NEW_NETWORK,
  network: { name, network }
});

