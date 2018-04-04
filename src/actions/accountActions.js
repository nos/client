import { createBatchActions } from 'spunky';

import authActions from './authActions';
import balancesActions from './balancesActions';

export const ID = 'account';

export default createBatchActions(ID, {
  auth: authActions,
  balances: balancesActions
});
