import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick } from 'lodash';

import withNetworkData from 'shared/hocs/withNetworkData';

import TestInvoke from './TestInvoke';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapInvokeDataToProps = (result) => ({ result });

const CONFIG_KEYS = ['scriptHash', 'operation', 'args', 'encodeArgs'];

export default function makeStorageComponent(testInvokeActions) {
  return compose(
    // Clean redux store when done
    withClean(testInvokeActions),

    // Rename arguments given by the user
    withProps(({ args }) => pick(args[0], CONFIG_KEYS)),

    // Get the current network
    withNetworkData(),

    // Run the test invoke & wait for success or failure
    withCall(testInvokeActions, ({
      net,
      scriptHash,
      operation,
      args,
      encodeArgs
    }) => ({
      net,
      scriptHash,
      operation,
      args,
      encodeArgs
    })),
    withNullLoader(testInvokeActions),
    withRejectMessage(testInvokeActions, (props) => (
      `Invocation failed for operation "${props.operation}" on "${props.scriptHash}"`
    )),
    withData(testInvokeActions, mapInvokeDataToProps)
  )(TestInvoke);
}
