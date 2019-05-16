import { createActions } from 'spunky';

export const ID = 'registerLedgerFormData';

export default createActions(ID, (data) => {
  return () => data;
});
