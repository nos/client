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

  api.setApiSwitch(1);
  const { response: { result, txid } } = await api.claimGas(config);
  api.setApiSwitch(0); // only temporarily use neonDB for gasClaims

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
