import { withActions, withCall, withData } from 'spunky';
import { compose } from 'recompose';

import TestInvoke from './TestInvoke';
import invokeActions from '../../../actions/invokeActions';

const mapInvokeActionsToProps = (actions) => ({
  testInvoke: (data) => {
    console.log('actions,', actions);
    actions.call(data);
  }
});

const mapInvokeDataToProps = ({ invoke }) => ({ invoke });


export default compose(
  // withActions(invokeActions, mapInvokeActionsToProps),
  withCall(invokeActions, ({ invoke }) => ({ invoke, net: 'TestNet' })),
  // withData(invokeActions, mapInvokeDataToProps)
)(TestInvoke);
