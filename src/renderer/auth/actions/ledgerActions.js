import { createActions } from 'spunky';

// TODO abstract these "polling functions" etc to a higher level (ledgerHelper perhaps)
import { getDeviceInfo, getPublicKey, getPublicKeys } from 'auth/util/Wallet/NEO/NeoLedger';

export const ID = 'ledger-1';
export const ID_2 = 'ledger-2';
export const ID_3 = 'ledger-3';

export default createActions(ID, () => async () => {
  const deviceInfo = await getDeviceInfo();
  return { deviceInfo };
});

export const ledgerPublicKeyActions = createActions(ID_2, () => async () => {
  const publicKey = await getPublicKey();
  return { publicKey };
});

export const ledgerPublicKeysActions = createActions(ID_3, (currentPublicKeys) => async () => {
  const publicKeys = await getPublicKeys(currentPublicKeys);
  return { publicKeys };
});
