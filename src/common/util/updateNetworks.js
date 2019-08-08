import { rpc, settings } from '@cityofzion/neon-js';
import { keys } from 'lodash';

import { NOS_LOCAL, NOS_TESTNET, ARK_RELAY, PREDEFINED_NETWORKS } from '../values/networks';

const { networks } = settings;

const nosLocalConfig = {
  name: NOS_LOCAL,
  extra: {
    neoscan: 'http://localhost:4000/api/main_net'
  }
};

const nosTestnetConfig = {
  name: NOS_TESTNET,
  extra: {
    neoscan: 'http://neoscan-testnet.nos.io:4000/api/main_net'
  }
};

const arkConfig = {
  name: ARK_RELAY,
  extra: {
    explorer: 'http://explorer.ark.io'
  }
};

export default function updateNetworks(userNetworks = []) {
  keys(networks).forEach((name) => {
    if (!PREDEFINED_NETWORKS.includes(name)) {
      settings.removeNetwork(name);
    }
  });

  settings.addNetwork(new rpc.Network(nosTestnetConfig));
  settings.addNetwork(new rpc.Network(nosLocalConfig));
  // settings.addNetwork(new rpc.Network(arkConfig));

  userNetworks.forEach((network) => {
    settings.addNetwork(new rpc.Network(network));
  });
}
