import { rpc } from '@cityofzion/neon-js';
import { createActions } from 'spunky';

import getRPCEndpoint from '@util/getRPCEndpoint';

import getRPCEndpoint3 from 'util/getRPCEndpoint';
import getRPCEndpoint2 from '@/util/getRPCEndpoint';

export const ID = 'block';

export default createActions(ID, ({ net }) => async () => {
  const endpoint = await getRPCEndpoint(net);
  const client = new rpc.RPCClient(endpoint);
  const height = await client.getBlockCount();
  return client.getBlock(height - 1);
});
