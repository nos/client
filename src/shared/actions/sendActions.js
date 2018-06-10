import { createActions } from 'spunky';

import sendAsset from '../util/sendAsset';

export const ID = 'send';

export default createActions(ID, ({ net, asset, amount, receiver, address, wif }) => () => {
  return sendAsset({ net, asset, amount, receiver, address, wif });
});
