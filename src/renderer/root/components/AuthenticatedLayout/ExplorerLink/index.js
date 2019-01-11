import { compose, withProps } from 'recompose';
import { settings } from '@cityofzion/neon-js';
import { URL } from 'whatwg-url';

import withNetworkData from 'shared/hocs/withNetworkData';

import ExplorerLink from './ExplorerLink';

function getTarget(network, endpoint) {
  try {
    const { protocol, host } = new URL(settings.networks[network].extra.neoscan);
    return `${protocol}//${host}/${endpoint}`;
  } catch (err) {
    return null;
  }
}

export default compose(
  withNetworkData('currentNetwork'),
  withProps(({ currentNetwork, endpoint = '' }) => ({
    target: getTarget(currentNetwork, endpoint)
  }))
)(ExplorerLink);
