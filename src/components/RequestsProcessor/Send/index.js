import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import Send from './Send';
import withClean from '../../../hocs/dapps/withClean';
import authActions from '../../../actions/authActions';
import withPrompt from '../../../hocs/dapps/withPrompt';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });
const mapSendDataToProps = (txid) => ({ txid });

export default function makeSendComponent(sendActions) {
  return compose(
    // Clean redux store when done
    withClean(sendActions),

    // Map the props
    withProps(({ args }) => ({
      asset: args[0],
      amount: args[1],
      receiver: args[2],
      net: 'TestNet'
    })),

    // Prompt user
    withPrompt(({ amount, asset, receiver }) => (
      `Would you like to send ${amount} ${asset} to ${receiver}`
    )),

    // Getting account data
    withData(authActions, mapAuthDataToProps),

    // Do invoke if user accepts
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
