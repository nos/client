import { withActions, withCall, withData } from 'spunky';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import { compose } from 'recompose';

import TestInvoke from './TestInvoke';
import invokeActions from '../../../actions/invokeActions';

const mapInvokeActionsToProps = (actions) => ({
  testInvoke: (data) => {
    console.log('actions,', actions);
    actions.call(data);
  }
});

const mapInvokeDataToProps = (response) => ({ response });


export default compose(
  withCall(invokeActions, ({ scriptHash, operation, args }) => ({ net: 'TestNet', scriptHash, operation, args })),
  withNullLoader(invokeActions),
  withData(invokeActions, mapInvokeDataToProps),
)(TestInvoke);
