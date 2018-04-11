import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import GetStorage from './GetStorage';
import withClean from '../../../hocs/dapps/withClean';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapStorageDataToProps = (data) => ({ data });

export default function makeStorageComponent(storageActions) {
  return compose(
    withClean(storageActions),
    withProps(({ args }) => ({ scriptHash: args[0], storageKey: args[1] })),
    withCall(storageActions, ({ scriptHash, storageKey }) => ({ net: 'TestNet', scriptHash, key: storageKey })),
    withNullLoader(storageActions),
    withRejectMessage(storageActions, (props) => (`Retrieving storage failed for key "${props.storageKey}" on "${props.scriptHash}"`)),
    withData(storageActions, mapStorageDataToProps)
  )(GetStorage);
}
