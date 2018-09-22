import { withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick } from 'lodash';

import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import Invoke from './Invoke';
import withClean from '../../../hocs/withClean';
import withInvocationPrompt from '../../../hocs/withInvocationPrompt';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';
import withSignTransactionToast from '../../../hocs/withSignTransactionToast';
import withValidation from '../../../hocs/withValidation';
import validateInvokeArgs from '../../../util/validateInvokeArgs';

const CONFIG_KEYS = ['scriptHash', 'operation', 'args', 'encodeArgs', 'assets'];

const mapAuthDataToProps = (data) => data;
const mapInvokeDataToProps = (txid) => ({ txid });

export default function makeInvoke(invokeActions, balancesActions) {
  return compose(
    // Clean redux store when done
    withClean(invokeActions),

    // Rename arguments given by the user
    withProps(({ args }) => pick(args[0], CONFIG_KEYS)),

    // Ensure the arguments provided are valid
    withValidation(validateInvokeArgs),

    // Prompt user
    withInvocationPrompt(balancesActions),

    // Get the current network and account data
    withNetworkData(),
    withData(authActions, mapAuthDataToProps),

    // Run the invoke & wait for success or failure
    withInitialCall(invokeActions, ({
      net,
      address,
      wif,
      publicKey,
      signingFunction,
      scriptHash,
      operation,
      args,
      assets,
      encodeArgs
    }) => ({
      net,
      address,
      wif,
      publicKey,
      signingFunction,
      scriptHash,
      operation,
      args,
      assets,
      encodeArgs
    })),
    withSignTransactionToast,
    withNullLoader(invokeActions),
    withRejectMessage(invokeActions, ({ operation, scriptHash, error }) => (
      `Could not perform operation '${operation}' on contract with address '${scriptHash}': ${error}`
    )),
    withData(invokeActions, mapInvokeDataToProps)
  )(Invoke);
}
