import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import authActions from 'login/actions/authActions';
import withNetworkData from 'shared/hocs/withNetworkData';

import Invoke from './Invoke';
import withClean from '../../../hocs/withClean';
import withPrompt from '../../../hocs/withPrompt';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });
const mapInvokeDataToProps = (txid) => ({ txid });

export default function makeInvokeComponent(invokeActions) {
  return compose(
    // Clean redux store when done
    withClean(invokeActions),

    // Rename arguments given by the user
    withProps(({ args }) => ({
      scriptHash: args[0],
      operation: args[1],
      args: args.slice(2)
    })),

    // Prompt user
    withPrompt(({ operation, scriptHash }) => (
      `Would you like to perform operation "${operation}" on contract with address "${scriptHash}"?`
    )),

    // Get the current network and account data
    withNetworkData(),
    withData(authActions, mapAuthDataToProps),

    // Run the invoke & wait for success or failure
    withCall(invokeActions, ({ net, address, wif, scriptHash, operation, args }) => ({
      net,
      address,
      wif,
      scriptHash,
      operation,
      args
    })),
    withNullLoader(invokeActions),
    withRejectMessage(invokeActions, ({ operation, scriptHash }) => (
      `Could not perform operation '${operation}' on contract with address '${scriptHash}'`
    )),
    withData(invokeActions, mapInvokeDataToProps)
  )(Invoke);
}
