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
    withProps(({ args }) => {
      const options = args[2] || {};
      return { scriptHash: args[0], storageKey: args[1], encode: !!options.encode };
    }),
    withCall(storageActions, ({ scriptHash, storageKey, encode }) => ({ net: 'TestNet', scriptHash, key: storageKey, encode })),
    withNullLoader(storageActions),
    withRejectMessage(storageActions, (props) => (`Retrieving storage failed for key "${props.storageKey}" on "${props.scriptHash}"`)),
    withData(storageActions, mapStorageDataToProps)
  )(GetStorage);
}
