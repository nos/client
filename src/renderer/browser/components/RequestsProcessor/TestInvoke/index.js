import { withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick } from 'lodash';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import TestInvoke from './TestInvoke';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapInvokeDataToProps = (result) => ({ result });

const CONFIG_KEYS = ['scriptHash', 'operation', 'args', 'script', 'encodeArgs'];

export default function makeTestInvoke(testInvokeActions) {
  return compose(
    // Clean redux store when done
    withClean(testInvokeActions),

    // Rename arguments given by the user
    withProps(({ args }) => pick(args[0], CONFIG_KEYS)),

    // Get the current network
    withNetworkData(),

    // Run the test invoke & wait for success or failure
    withInitialCall(
      testInvokeActions,
      ({ net, scriptHash, operation, args, script, encodeArgs }) => ({
        net,
        scriptHash,
        operation,
        args,
        script,
        encodeArgs
      })
    ),
    withNullLoader(testInvokeActions),
    withRejectMessage(
      testInvokeActions,
      ({ operation, scriptHash, error }) =>
        `Invocation failed for operation "${operation}" on ${scriptHash}: ${error}`
    ),
    withData(testInvokeActions, mapInvokeDataToProps)
  )(TestInvoke);
}
