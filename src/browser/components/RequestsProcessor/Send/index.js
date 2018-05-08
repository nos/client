import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import authActions from 'login/actions/authActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import { NEO, GAS } from 'shared/values/assets';

import Send from './Send';
import withClean from '../../../hocs/withClean';
import withPrompt from '../../../hocs/withPrompt';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });
const mapSendDataToProps = (txid) => ({ txid });

const getAssetName = (assetId) => {
  switch (`${assetId}`.toLowerCase()) {
    case NEO:
      return 'NEO';
    case GAS:
      return 'GAS';
    default:
      return assetId;
  }
};

export default function makeSendComponent(sendActions) {
  return compose(
    // Clean redux store when done
    withClean(sendActions),

    // Rename arguments given by the user
    withProps(({ args }) => ({
      asset: args[0],
      amount: args[1],
      receiver: args[2]
    })),

    // Prompt user
    withPrompt(({ amount, asset, receiver }) => (
      `Would you like to send ${amount} ${getAssetName(asset)} to ${receiver}?`
    )),

    // Get the current network & account data
    withNetworkData(),
    withData(authActions, mapAuthDataToProps),

    // Send assets & wait for success or failure
    withCall(sendActions, ({ net, amount, asset, receiver, address, wif }) => ({
      net,
      amount,
      asset,
      receiver,
      address,
      wif
    })),
    withNullLoader(sendActions),
    withRejectMessage(sendActions, ({ amount, asset, receiver }) => (
      `Could not send ${amount} ${asset} to ${receiver}`
    )),
    withData(sendActions, mapSendDataToProps)
  )(Send);
}
