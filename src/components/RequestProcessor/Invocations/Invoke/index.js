import {withCall, withData, withActions} from 'spunky';
import {compose, withProps} from 'recompose';

import Invoke from './Invoke';
import authActions from "../../../../actions/authActions";
import invokeActions from "../../../../actions/invocations/invokeActions";
import withPrompt from "../../../../hocs/dapps/withPrompt";
import withNullLoader from "../../../../hocs/dapps/withNullLoader";
import withRejectMessage from "../../../../hocs/dapps/withRejectMessage";
import balancesActions from "../../../../actions/balancesActions";

const mapAuthDataToProps = (account) => ({account});
const mapInvokeDataToProps = (response) => ({response});
const mapBalancesDataToProps = (balances) => ({balances});


export default compose(
  // Map the props
  withProps(({args}) => ({
    scriptHash: args[0],
    operation: args[1],
    args: args.slice(2),
    net: 'TestNet'
  })),

  // Prompt user
  withPrompt(invokeActions, ({operation, scriptHash}) => `Would you like to perform operation '${operation}' on contract with address '${scriptHash}'`),

  // Getting account data
  withData(authActions, mapAuthDataToProps),

  // Getting balances from account
  withData(balancesActions, mapBalancesDataToProps),
  withCall(balancesActions, ({address}) => ({address, net: 'TestNet'})),
  withNullLoader(balancesActions),
  withRejectMessage(balancesActions, 'Your account balance could not be retrieved.'),

  // Do invoke if user accepts
  withCall(invokeActions, ({net, account, balances, scriptHash, operation, args}) => ({
    net,
    account,
    balances,
    scriptHash,
    operation,
    args
  })),
  withNullLoader(invokeActions),
  withRejectMessage(invokeActions, ({ operation, scriptHash }) => `Could not perform operation '${operation}' on contract with address '${scriptHash}'`),
  withData(invokeActions, mapInvokeDataToProps)
)(Invoke);
