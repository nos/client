import { createBatchActions } from 'spunky';

import authActions from 'login/actions/authActions';

import balancesActions from './balancesActions';

export const ID = 'account';

export default createBatchActions(ID, {
  auth: authActions,
  balances: balancesActions
});
