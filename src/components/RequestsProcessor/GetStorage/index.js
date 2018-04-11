import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import GetStorage from './GetStorage';
import { getCurrentNetwork } from '../../../actions/settings/currentNetworkActions';
import withClean from '../../../hocs/dapps/withClean';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapStorageDataToProps = (data) => ({ data });
const mapSettingsDataToProps = ({ currentNetwork }) => ({ net: currentNetwork });

export default function makeStorageComponent(storageActions) {
  return compose(
    // Clean redux store when done
    withClean(storageActions),

    // Rename arguments given by the user
    withProps(({ args }) => ({ scriptHash: args[0], storageKey: args[1] })),

    // Get the current network
    withData(getCurrentNetwork, mapSettingsDataToProps),

    // Get the storage data & wait for success or failure
    withCall(storageActions, ({ net, scriptHash, storageKey }) => ({
      net,
      scriptHash,
      key: storageKey
    })),
    withNullLoader(storageActions),
    withRejectMessage(storageActions, (props) => (
      `Retrieving storage failed for key "${props.storageKey}" on "${props.scriptHash}"`
    )),
    withData(storageActions, mapStorageDataToProps)
  )(GetStorage);
}
