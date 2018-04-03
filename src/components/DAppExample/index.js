import { withActions, withCall } from "spunky";
import { compose } from "recompose";

import Dapp from './DAppExample';
import invokeActions from "../../actions/invokeActions";

const mapInvokeActionsToProps = (actions) => ({
  testInvoke: (data) => {
    console.log('ACTIONS', actions);
    console.log('data', data);
    actions.call(data)
  }
});


export default compose(
  withActions(invokeActions, mapInvokeActionsToProps),
  withCall(invokeActions),
)(Dapp);