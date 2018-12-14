import fetch from 'node-fetch';
import uuid from 'uuid/v4';
import { createActions } from 'spunky';
import { omit } from 'lodash';

import { api } from '@cityofzion/neon-js';

import { NEO, GAS, ASSETS } from 'shared/values/assets';
import getTokens from 'shared/util/getTokens';

const TX_TYPES = {
  SEND: 'Send',
  RECEIVE: 'Receive',
  CLAIM: 'Claim',
  INVOCATION: 'Invocation'
};

function parseAbstractData(data, currentUserAddress, tokens) {
  const parsedTxType = (abstract) => {
    if (abstract.address_to === currentUserAddress && abstract.address_from !== 'claim') {
      return TX_TYPES.RECEIVE;
    }
    if (abstract.address_from === 'claim') return TX_TYPES.CLAIM;
    return TX_TYPES.SEND;
  };

  const parsedAsset = (abstract) => {
    const tokensResult = tokens.find((token) => token === abstract.asset);
    if (tokensResult) return tokensResult;
    if (abstract.asset === NEO || abstract.asset === GAS) {
      return ASSETS[abstract.asset];
    }
    return { symbol: '' };
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
    const summary = {
      to: parsedTo(abstract),
      isNetworkFee: abstract.address_to === 'fees',
      from: parsedFrom(abstract),
      txId: abstract.txid,
      time: abstract.time,
      amount: abstract.amount,
      asset,
      label: abstract.address_to === currentUserAddress ? 'IN' : 'OUT',
      type,
      id: uuid()
    };

    return summary;
  });
}

async function getTransactionHistory({ net, address, previousCall = {} }) {
  const { page_number: pageNumber = 0, total_pages: totalPages = 1, entries = [] } = previousCall;
  const pageCount = pageNumber + 1;
  if (pageCount > totalPages) return previousCall;

  const tokens = await getTokens();
  const endpoint = api.neoscan.getAPIEndpoint(net);

  const data = await fetch(`${endpoint}/v1/get_address_abstracts/${address}/${pageCount}`);
  const response = await data.json();
  return {
    ...omit(response, 'entries'),
    entries: [...entries, ...parseAbstractData(response.entries, address, tokens)]
  };
}

export const ID = 'transaction_history';

export default createActions(ID, ({ net, address, previousCall }) => async () => {
  return getTransactionHistory({ net, address, previousCall });
});
