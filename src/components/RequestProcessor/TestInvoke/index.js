import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import TestInvoke from './TestInvoke';
import invokeActions from '../../../actions/invokeActions';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapInvokeDataToProps = (response) => ({ response });

export default compose(
  withProps(({ args }) => ({
    scriptHash: args[0],
    operation: args[1],
    args: args.slice(2)
  })),
  withCall(invokeActions, ({ scriptHash, operation, args }) => ({ net: 'TestNet', scriptHash, operation, args })),
  withNullLoader(invokeActions),
  withRejectMessage(invokeActions, (props) => (`Invocation failed for operation "${props.operation}" on "${props.scriptHash}"`)),
  withData(invokeActions, mapInvokeDataToProps)
)(TestInvoke);
