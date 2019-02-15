import { createActions } from 'spunky';
import { isEmpty } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';

export const NETWORKS_ID = 'networks';

// Setters
export const addNetwork = createActions(NETWORKS_ID, (network) => async () => {
  const networks = await getStorage(NETWORKS_ID);
  const newNetworks = [...networks, network];
  await setStorage(NETWORKS_ID, newNetworks);
  return newNetworks;
});

export const clearNetworks = createActions(NETWORKS_ID, () => async () => {
  await setStorage(NETWORKS_ID, []);
  return [];
});

// Getters
export default createActions(NETWORKS_ID, () => async () => {
  const networks = await getStorage(NETWORKS_ID);
  const safeNetworks = !isEmpty(networks) ? networks : undefined;
  return [...(safeNetworks || [])];
});
