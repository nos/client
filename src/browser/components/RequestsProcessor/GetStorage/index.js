import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import withNetworkData from 'shared/hocs/withNetworkData';

import GetStorage from './GetStorage';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapStorageDataToProps = (data) => ({ data });

export default function makeStorageComponent(storageActions) {
  return compose(
    // Clean redux store when done
    withClean(storageActions),

    // Rename arguments given by the user
    withProps(({ args }) => {
      const options = args[2] || {};
      return {
        scriptHash: args[0],
        storageKey: args[1],
        encode: !!options.encode
      };
    }),

    // Get the current network
    withNetworkData(),

    // Get the storage data & wait for success or failure
    withCall(storageActions, ({ net, scriptHash, storageKey, encode }) => ({
      net,
      scriptHash,
      key: storageKey,
      encode
    })),
    withNullLoader(storageActions),
    withRejectMessage(storageActions, (props) => (
      `Retrieving storage failed for key "${props.storageKey}" on "${props.scriptHash}"`
    )),
    withData(storageActions, mapStorageDataToProps)
  )(GetStorage);
}
