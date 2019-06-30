import { getStorage, appendStorage } from 'shared/lib/storage';

export const ID = 'account';

const appendAccountToStorage = async ({ label, value }) => {
  console.info(`Appending account with label ${label} to storage `, value);
  await appendStorage(ID, label, value);
  return getStorage(ID);
};

export { appendAccountToStorage };
