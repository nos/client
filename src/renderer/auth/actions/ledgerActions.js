import { createActions } from 'spunky';

import { getDeviceInfo, getPublicKey } from '../util/NEO/NeoLedger';

export const ID = 'ledger-1';
export const ID_2 = 'ledger-2';

export default createActions(ID, () => async () => {
  const deviceInfo = await getDeviceInfo();
  return { deviceInfo };
});

export const ledgerPublicKeyActions = createActions(ID_2, () => async () => {
  const publicKey = await getPublicKey();
  return { publicKey };
});
