import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import Invoke from './Invoke';
import authActions from '../../../actions/authActions';
import withClean from '../../../hocs/dapps/withClean';
import withPrompt from '../../../hocs/dapps/withPrompt';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });
const mapInvokeDataToProps = (txid) => ({ txid });

export default function makeInvokeComponent(invokeActions) {
  return compose(
    // Clean redux store when done
    withClean(invokeActions),

    // Map the props
    withProps(({ args }) => ({
      scriptHash: args[0],
      operation: args[1],
      args: args.slice(2),
      net: 'TestNet'
    })),

    // Prompt user
    withPrompt(({ operation, scriptHash }) => (
      `Would you like to perform operation '${operation}' on contract with address '${scriptHash}'`
    )),

    // Getting account data
    withData(authActions, mapAuthDataToProps),

    // Do invoke if user accepts
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
