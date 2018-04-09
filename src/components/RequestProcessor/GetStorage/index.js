import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import GetStorage from './GetStorage';
import makeStorageActions from '../../../actions/dapps/makeStorageActions';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapStorageDataToProps = (data) => ({ data });

export default function makeStorageComponent(sessionId) {
  const storageActions = makeStorageActions(sessionId);

  return compose(
    withProps(({ args }) => ({ scriptHash: args[0], storageKey: args[1] })),
    withCall(storageActions, ({ scriptHash, storageKey }) => ({ net: 'TestNet', scriptHash, key: storageKey })),
    withNullLoader(storageActions),
    withRejectMessage(storageActions, (props) => (`Retrieving storage failed for key "${props.storageKey}" on "${props.scriptHash}"`)),
    withData(storageActions, mapStorageDataToProps)
  )(GetStorage);
}
