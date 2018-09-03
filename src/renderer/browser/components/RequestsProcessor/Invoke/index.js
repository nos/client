import { withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick, map, trim } from 'lodash';

import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';
import formatIntents from 'shared/util/formatIntents';

import Invoke from './Invoke';
import withClean from '../../../hocs/withClean';
import withPrompt from '../../../hocs/withPrompt';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const CONFIG_KEYS = ['scriptHash', 'operation', 'args', 'encodeArgs', 'intents'];

const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });
const mapInvokeDataToProps = (txid) => ({ txid });

function getInvokeMessage({ operation, scriptHash, intents }) {
  const formattedIntents = formatIntents(intents);
  const costs = map(formattedIntents, (amount, asset) => `${amount} ${asset}`);
  const costMessage = costs.length === 0 ? '' : `This operation will cost ${costs.join(' and ')}.`;

  return trim(
    `Would you like to perform operation "${operation}" on contract ` +
    `with address "${scriptHash}"? ${costMessage}`
  );
}

export default function makeInvoke(invokeActions) {
  return compose(
    // Clean redux store when done
    withClean(invokeActions),

    // Rename arguments given by the user
    withProps(({ args }) => pick(args[0], CONFIG_KEYS)),

    // Prompt user
    withPrompt(getInvokeMessage),

    // Get the current network and account data
    withNetworkData(),
    withData(authActions, mapAuthDataToProps),

    // Run the invoke & wait for success or failure
    withInitialCall(invokeActions, ({
      net,
      address,
      wif,
      scriptHash,
      operation,
      args,
      intents,
      encodeArgs
    }) => ({
      net,
      address,
      wif,
      scriptHash,
      operation,
      args,
      intents,
      encodeArgs
    })),
    withNullLoader(invokeActions),
    withRejectMessage(invokeActions, ({ operation, scriptHash, error }) => (
      `Could not perform operation '${operation}' on contract with address '${scriptHash}': ${error}`
    )),
    withData(invokeActions, mapInvokeDataToProps)
  )(Invoke);
}
