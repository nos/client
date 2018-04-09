import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import TestInvoke from './TestInvoke';
import makeTestInvokeActions from '../../../actions/dapps/makeTestInvokeActions';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapInvokeDataToProps = (script) => ({ script });

export default function makeStorageComponent(sessionId) {
  const testInvokeActions = makeTestInvokeActions(sessionId);

  return compose(
    // Map the props
    withProps(({ args }) => ({
      net: 'TestNet',
      scriptHash: args[0],
      operation: args[1],
      args: args.slice(2)
    })),

    // Invoke actions
    withCall(testInvokeActions, ({ net, scriptHash, operation, args }) => ({
      net,
      scriptHash,
      operation,
      args
    })),
    withNullLoader(testInvokeActions),
    withRejectMessage(testInvokeActions, (props) => (
      `Invocation failed for operation "${props.operation}" on "${props.scriptHash}"`
    )),
    withData(testInvokeActions, mapInvokeDataToProps)
  )(TestInvoke);
}
