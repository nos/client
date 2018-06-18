import { rpc, settings } from '@cityofzion/neon-js';
import { keys } from 'lodash';

import { NOS_LOCAL, PREDEFINED_NETWORKS } from 'settings/values/networks';

const { networks } = settings;

const nosLocalConfig = {
  name: NOS_LOCAL,
  extra: {
    neoscan: 'http://localhost:4000/api/main_net'
  }
};

export default function updateNetworks(userNetworks) {
  keys(networks).forEach((name) => {
    if (!PREDEFINED_NETWORKS.includes(name)) {
      settings.removeNetwork(name);
    }
  });

  settings.addNetwork(new rpc.Network(nosLocalConfig));

  userNetworks.forEach((network) => {
    settings.addNetwork(new rpc.Network(network));
  });
}
