import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick } from 'lodash';

import withNetworkData from 'shared/hocs/withNetworkData';

import GetStorage from './GetStorage';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapStorageDataToProps = (data) => ({ data });
const CONFIG_KEYS = ['scriptHash', 'key', 'encodeInput', 'decodeOutput'];

export default function makeStorageComponent(storageActions) {
  return compose(
    // Clean redux store when done
    withClean(storageActions),

    // Rename arguments given by the user
    withProps(({ args }) => {
      const result = pick(args[0], CONFIG_KEYS);
      if (result.key) {
        result.index = result.key; // key is reserved in React props, so we map it to index
        delete result.key;
      }
      return result;
    }),

    // Get the current network
    withNetworkData(),

    // Get the storage data & wait for success or failure
    withCall(storageActions, ({
      net,
      scriptHash,
      index,
      encodeInput,
      decodeOutput
    }) => ({
      net,
      scriptHash,
      key: index, // and then map it back to key in the call to keep the same terms as neon-js
      encodeInput,
      decodeOutput
    })),
    withNullLoader(storageActions),
    withRejectMessage(storageActions, ({ index, scriptHash, error }) => (
      `Retrieving storage failed for key "${index}" on "${scriptHash}": ${error}`
    )),
    withData(storageActions, mapStorageDataToProps)
  )(GetStorage);
}
