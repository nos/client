import Neon, { rpc } from '@cityofzion/neon-js';

const nosLocalConfig = {
  name: 'nOSLocal',
  extra: {
    neoscan: 'http://localhost:4000/api/main_net'
  }
};

const nOSLocal = new rpc.Network(nosLocalConfig);
Neon.add.network(nOSLocal);
