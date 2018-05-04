import { rpc, settings } from '@cityofzion/neon-js';
import { NOS_LOCAL } from '../values/networks';

const nosLocalConfig = {
  name: NOS_LOCAL,
  extra: {
    neoscan: 'http://localhost:4000/api/main_net'
  }
};

settings.addNetwork(new rpc.Network(nosLocalConfig));
