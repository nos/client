import { api, rpc } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

export const ID = 'block';

export default createActions(ID, ({ net }) => async () => {
  const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan);
  const client = new rpc.RPCClient(endpoint);
  const height = await client.getBlockCount();
  return client.getBlock(height - 1);
});
