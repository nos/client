import { createActions } from 'spunky';

import claimGas from '../util/claimGas';

export const ID = 'claim';

export default createActions(ID, (options) => () => claimGas(options));
