import { rpc, settings } from '@cityofzion/neon-js';
import { keys } from 'lodash';

export default function updateNetworks(userNetworks) {
  // addNetwork will overwrite existing network
  // if they have the same name
  userNetworks.forEach((network) => {
    settings.addNetwork(new rpc.Network(network));
  });
}
