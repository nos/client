import { createActions } from 'spunky';
import { api } from '@cityofzion/neon-js';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'claim';

const claimGas = async ({ net, address, wif }) => {
  const config = {
    net,
    address,
    privateKey: wif
  };

  const { response: { result, txid } } = await api.claimGas(config, api.neoscan);

  if (!result) {
    throw new Error('Claim failed.');
  }

  return txid;
};

export default function makeClaimActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ net, address, wif }) => () => {
    return claimGas({ net, address, wif });
  });
}
