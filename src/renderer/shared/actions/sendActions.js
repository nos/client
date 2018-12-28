import { createActions } from 'spunky';

import sendAsset from '../util/sendAsset';

export const ID = 'send';

export default createActions(ID, (options) => () => sendAsset(options));
