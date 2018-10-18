import { api, u } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'claimable';

export default createActions(ID, ({ net, address }) => async () => {
  const total = await api.getMaxClaimAmountFrom({ net, address }, api.neoscan);
  return total instanceof u.Fixed8 ? total.toString() : '0';
});
