import { wallet } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

import { getStorage, setStorage } from 'shared/lib/storage';

export const ID = 'previousAuth';

export const writePreviousAuthActions = createActions(ID, ({ encryptedWIF }) => async () => {
  if (!wallet.isNEP2(encryptedWIF)) {
    throw new Error('Invalid encrypted WIF');
  }

  const data = { encryptedWIF };
  await setStorage(ID, data);
  return data;
});

export default createActions(ID, () => async () => {
  return (await getStorage(ID)) || {};
});
