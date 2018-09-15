import { compose } from 'recompose';
import { withData } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import GetNetwork from './GetNetwork';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapNetworkServerDataToProps = (servers) => ({ servers });

export default function makeGetNetwork(networkServerActions) {
  return compose(
    // Clean redux store when done
    withClean(networkServerActions),

    // Get the current network & account address
    withNetworkData('network'),

    // Get the network servers & wait for success or failure
    withInitialCall(networkServerActions, ({ network }) => ({ net: network })),
    withNullLoader(networkServerActions),
    withRejectMessage(networkServerActions, ({ error }) => (
      `Network servers could not be retrieved: ${error}`
    )),
    withData(networkServerActions, mapNetworkServerDataToProps)
  )(GetNetwork);
}
