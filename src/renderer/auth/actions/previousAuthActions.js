import { createActions } from 'spunky';

import { getStorage, setStorage } from 'shared/lib/storage';

export const ID = 'previousAuth';

export const writePreviousAuthActions = createActions(ID, ({ label }) => async () => {
  const data = { label };
  await setStorage(ID, data);
  return data;
});

export default createActions(ID, () => async () => {
  return (await getStorage(ID)) || {};
});
