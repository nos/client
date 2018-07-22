import { withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick } from 'lodash';

import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
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

const CONFIG_KEYS = ['asset', 'amount', 'receiver', 'remark'];

export default function makeSend(sendActions) {
  return compose(
    // Clean redux store when done
    withClean(sendActions),

    // Rename arguments given by the user
    withProps(({ args }) => pick(args[0], CONFIG_KEYS)),

    // Prompt user
    withPrompt(({ amount, asset, receiver }) => (
      `Would you like to send ${amount} ${getAssetName(asset)} to ${receiver}?`
    )),

    // Get the current network & account data
    withNetworkData(),
    withData(authActions, mapAuthDataToProps),

    // Send assets & wait for success or failure
    withInitialCall(sendActions, ({ net, amount, asset, receiver, address, wif, remark }) => ({
      net,
      amount,
      asset,
      receiver,
      address,
      wif,
      remark
    })),
    withNullLoader(sendActions),
    withRejectMessage(sendActions, ({ amount, asset, receiver, error }) => (
      `Could not send ${amount} ${asset} to ${receiver}: ${error}`
    )),
    withData(sendActions, mapSendDataToProps)
  )(Send);
}
