import { createActions } from 'spunky';

import getNEOTransactionHistory from './NEO/getNEOTransactionHistory';
import getARKTransactionHistory from './ARK/getARKTransactionHistory';

async function getTransactionHistory({ net, coinType, address, previousCall = {} }) {
  if (coinType === 888) {
    // NEO
    return getNEOTransactionHistory({ net, address, previousCall });
  } else if (coinType === 111) {
    // ARK
    return getARKTransactionHistory({ address, previousCall });
  } else {
    throw new Error('coinType is invalid');
  }
}

export const ID = 'transaction_history';

export default createActions(ID, ({ net, coinType, address, previousCall }) => async () => {
  return getTransactionHistory({ net, coinType, address, previousCall });
});
