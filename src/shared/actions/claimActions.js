import { createActions } from 'spunky';

import claimGas from '../util/claimGas';

export const ID = 'claim';

export default createActions(ID, ({ net, address, wif }) => () => {
  return claimGas({ net, address, wif });
});
