import { createBatchActions } from 'spunky';

import authActions from 'auth/actions/authActions';
import walletActions from 'auth/actions/walletActions';
import balanceWithPricesActions from 'account/actions/balanceWithPricesActions';
import claimableActions from 'shared/actions/claimableActions';

import balancesActions from './balancesActions';

export const ID = 'account';

export default createBatchActions(ID, {
  auth: authActions,
  balances: balancesActions,
  wallets: walletActions,
  balanceWithPrices: balanceWithPricesActions,
  claimables: claimableActions
});
