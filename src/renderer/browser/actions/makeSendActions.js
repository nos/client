import { createActions } from 'spunky';

import sendAsset from 'shared/util/sendAsset';

import generateDAppActionId from './generateDAppActionId';

export const ID = 'send';

export default function makeSendActions(sessionId, requestId, ...args) {
  const id = generateDAppActionId(sessionId, `${ID}-${requestId}`);
  return createActions(id, (options) => () => sendAsset(options, ...args));
}
