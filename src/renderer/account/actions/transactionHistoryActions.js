import fetch from 'node-fetch';
import { createActions } from 'spunky';
import { filter, reduce, map } from 'lodash';

import { api } from '@cityofzion/neon-js';

import getBalances from '../../shared/util/getBalances';

// import { ASSETS } from 'shared/values/assets';
//
// export const NEO_ID = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b';
// export const GAS_ID = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
//
// function sum(txns, address, asset) {
//   const matchingTxns = filter(txns, (txn) => {
//     return txn.asset === asset && txn.address_hash === address;
//   });
//
//   return reduce(matchingTxns, (sum, txn) => {
//     return sum.plus(txn.value);
//   }, 0); // TODO --> toBigNumber
// }

function getTransactionHistory({ net, address }) {
  console.log('===== TEST =======');
  // const endpoint = api.neoscan.getAPIEndpoint(net);
  // const data = await fetch(`${endpoint}/v1/get_last_transactions_by_address/${address}`);
  // return data.map(({ txid, vin, vouts }) => ({
  //   txid,
  //   [ASSETS.NEO]: sum(vouts, address, NEO_ID).minus(sum(vin, address, NEO_ID)).toFixed(0),
  //   [ASSETS.GAS]: sum(vouts, address, GAS_ID).minus(sum(vin, address, GAS_ID)).round(8).toString() // TODO decimals
  // }));
}

export const ID = 'TRANSACTION_HISTORY';

export default createActions(ID, ({ net,
  address } = {}) => getTransactionHistory({ net, address }));
