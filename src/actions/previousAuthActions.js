import { wallet } from '@cityofzion/neon-js';
import { createActions } from 'spunky';
import { getStorage, setStorage } from '../lib/storage';

export const ID = 'previousAuth';

export const writePreviousAuthActions = createActions(ID, ({ encryptedWIF }) => async () => {
  if (!wallet.isNEP2(encryptedWIF)) {
    throw new Error('Invalid encrypted WIF');
  }

  const previousAuth = await getStorage(ID) || {};
  const previousWIF = previousAuth && previousAuth.encryptedWIFs || [];
  const data = { encryptedWIFs: [...previousWIF, encryptedWIF] };
  await setStorage(ID, data);
  return data;
});

export default createActions(ID, () => async () => {
  return await getStorage(ID) || {};
});
