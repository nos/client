import { createActions } from 'spunky';
import { some, isEmpty } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';

export const ID = 'profiles_v1';

export default createActions(ID, ({ walletName, address, encryptedKey }) => async () => {
  const { profiles } = await getStorage(ID);

  const exists = some(profiles, (profile) => profile.walletName === walletName);
  if (exists) {
    throw new Error('Wallet name already exists in storage.');
  }

  const updatedProfiles = {
    profiles: [
      {
        walletName,
        address,
        encryptedKey
      },
      ...(!isEmpty(profiles) ? profiles : [])
    ]
  };

  await setStorage(ID, updatedProfiles);

  return { walletName, address, encryptedKey };
});
