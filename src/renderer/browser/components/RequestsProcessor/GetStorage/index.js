import { withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick } from 'lodash';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import GetStorage from './GetStorage';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapStorageDataToProps = (data) => ({ data });

const CONFIG_KEYS = ['scriptHash', 'key', 'encodeInput', 'decodeOutput'];

export default function makeGetStorage(storageActions) {
  return compose(
    // Clean redux store when done
    withClean(storageActions),

    // Rename arguments given by the user
    withProps(({ args }) => {
      const { key: index, ...config } = pick(args[0], CONFIG_KEYS);
      return { index, ...config }; // `key` is reserved in react props, so rename it to `index`...
    }),

    // Get the current network
    withNetworkData(),

    // Get the storage data & wait for success or failure
    withInitialCall(storageActions, ({ net, scriptHash, index, encodeInput, decodeOutput }) => ({
      net,
      scriptHash,
      key: index, // ...and then map it back to `key` as expected by neon-js
      encodeInput,
      decodeOutput
    })),
    withNullLoader(storageActions),
    withRejectMessage(
      storageActions,
      ({ index, scriptHash, error }) =>
        `Retrieving storage failed for key "${index}" on ${scriptHash}: ${error}`
    ),
    withData(storageActions, mapStorageDataToProps)
  )(GetStorage);
}
