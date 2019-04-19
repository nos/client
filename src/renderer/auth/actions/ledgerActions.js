import { createActions } from 'spunky';

import { attempt, isError } from 'lodash';

import { getDeviceInfo, getPublicKey } from '../util/NEO/NeoLedger';

export const ID = 'ledger';

export default createActions(ID, () => async () => {
  const deviceInfo = attempt(async () => getDeviceInfo());
  const publicKey = await attempt(getPublicKey());

  if (isError(deviceInfo)) {
    console.log('KHier ', deviceInfo);
    throw deviceInfo;
  }

  if (isError(publicKey)) {
    return { deviceInfo };
  }

  return { publicKey, deviceInfo };
});
