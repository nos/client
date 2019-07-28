import { createActions } from 'spunky';
import { some, isEmpty } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';

import PROFILE_ID from 'shared/values/profile';

const ID = PROFILE_ID;

// Getters
export const getProfiles = createActions(ID, () => async () => {
  const profiles = await getStorage(ID);
  return profiles;
});

// Setter
export default createActions(ID, ({ walletName, address, encryptedKey }) => async () => {
  const { profiles } = await getStorage(ID);

  const exists = some(profiles, (profile) => profile.walletName === walletName);
  if (exists) {
    throw new Error(`Wallet name "${walletName}" already exists in storage.`);
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
