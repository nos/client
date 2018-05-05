import { createActions } from 'spunky';

import sendAsset from 'shared/util/sendAsset';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'send';

export default function makeSendActions(sessionId, requestId) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);

  return createActions(id, ({ net, asset, amount, receiver, address, wif }) => () => {
    return sendAsset({ net, asset, amount, receiver, address, wif });
  });
}
