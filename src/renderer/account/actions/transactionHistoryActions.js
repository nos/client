import fetch from 'node-fetch';
import { createActions } from 'spunky';
import { filter, reduce, map } from 'lodash';

import { api } from '@cityofzion/neon-js';

import { ASSETS } from 'shared/values/assets';

import getBalances from '../../shared/util/getBalances';

const TX_TYPES = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
  CLAIM: 'CLAIM'
};

export const NEO_ID = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b';
export const GAS_ID = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';

function parseAbstractData(data, currentUserAddress, tokens) {
  const parsedTxType = (abstract) => {
    if (abstract.address_to === currentUserAddress && abstract.address_from !== 'claim') {
      return TX_TYPES.RECEIVE;
    }
    if (abstract.address_from === 'claim') return TX_TYPES.CLAIM;
    return TX_TYPES.SEND;
  };

  const parsedAsset = (abstract) => {
    const token = tokens.find((token) => token === abstract.asset);
    if (token) return token;
    if (abstract.asset === NEO_ID) {
      return {
        symbol: ASSETS.NEO
      };
    }
    if (abstract.asset === GAS_ID) {
      return {
        symbol: ASSETS.GAS
      };
    }
    return {};
  };

  const parsedTo = (abstract) => {
    if (abstract.address_to === 'fees') return 'NETWORK FEES';
    if (abstract.address_to === 'mint') return 'MINT TOKENS';
    return abstract.address_to;
  };

  const parsedFrom = (abstract) => {
    if (abstract.address_from === 'mint') return 'MINT TOKENS';
    return abstract.address_from;
  };

  return data.map((abstract) => {
    const asset = parsedAsset(abstract);
    const type = parsedTxType(abstract);
    console.log('abstract', { ...abstract, asset });
    const summary = {
      to: parsedTo(abstract),
      isNetworkFee: abstract.address_to === 'fees',
      from: parsedFrom(abstract),
      txid: abstract.txid,
      time: abstract.time,
      amount: abstract.amount,
      asset,
      label: type === TX_TYPES.CLAIM ? 'Gas Claim' : asset.symbol,
      type,
      id: `_${Math.random()
        .toString(36)
        .substr(2, 9)}`
    };

    return summary;
  });
}

async function getTransactionHistory({ net, address }) {
  console.log('===== TEST =======');
  const endpoint = api.neoscan.getAPIEndpoint(net);
  const data = await fetch(`${endpoint}/v1/get_address_abstracts/${address}/1`);
  const response = await data.json();
  console.log('data', response);
  try {
    const x = parseAbstractData(response.entries, address, [NEO_ID, GAS_ID]);
    console.log('data', x);
  } catch (e) {
    console.log(e);
  }
  console.log('===== TEST =======');
}

export const ID = 'transaction_history';

export default createActions(ID, ({ net, address }) => async () => {
  return getTransactionHistory({ net, address });
});

// export default createActions(ID, ({ net, address } = {}) => async () => {
// return getTransactionHistory({ net, address });
// });
