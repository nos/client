import fetch from 'node-fetch';
import { createActions } from 'spunky';
import { filter, reduce, map } from 'lodash';

import { api } from '@cityofzion/neon-js';

import { ASSETS } from 'shared/values/assets';

import getBalances from '../../shared/util/getBalances';

export const NEO_ID = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b';
export const GAS_ID = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';

function sum(txns, address, asset) {
  const matchingTxns = filter(txns, (txn) => {
    return txn.asset === asset && txn.address_hash === address;
  });

  return reduce(
    matchingTxns,
    (sum, txn) => {
      return sum.plus(txn.value);
    },
    0
  ); // TODO --> toBigNumber
}

async function getTransactionHistory({ net, address }) {
  console.log('===== TEST =======');
  const endpoint = api.neoscan.getAPIEndpoint(net);
  const data = await fetch(`${endpoint}/v1/get_last_transactions_by_address/${address}`);
  console.log('data', data);
  console.log('===== TEST =======');
}

export const ID = 'transaction_history';

export default createActions(ID, ({ net, address }) => async () => {
  return getTransactionHistory({ net, address });
});

// export default createActions(ID, ({ net, address } = {}) => async () => {
// return getTransactionHistory({ net, address });
// });
