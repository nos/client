import { compose, withProps } from 'recompose';
import { settings } from '@cityofzion/neon-js';
import { URL } from 'whatwg-url';

import withNetworkData from 'shared/hocs/withNetworkData';

import ExplorerLink from './ExplorerLink';

function getTarget(network) {
  try {
    const { protocol, host } = new URL(settings.networks[network].extra.neoscan);
    return `${protocol}//${host}`;
  } catch (err) {
    return null;
  }
}

export default compose(
  withNetworkData('currentNetwork'),
  withProps((props) => ({
    target: getTarget(props.currentNetwork)
  }))
)(ExplorerLink);
